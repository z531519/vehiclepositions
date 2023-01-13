import { DataGrid, GridRowId, GridRowIdGetter } from '@mui/x-data-grid';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Map, Marker, GeoJson, GeoJsonLoader, GeoJsonFeature } from "pigeon-maps"

import VehiclePosition from '../model/VehiclePosition';
import VehiclePositionLocationHeader from './VehiclePositionLocationHeader';
import { useVehiclePositionService } from '../services/ServiceHook';
import { Button, Paper, Popover, PopoverPosition, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';


export default function VehiclePositionGeoView() {
  const vehiclePositionService = useVehiclePositionService({
    base: 'http://localhost:8080'
  });

  const geoJsonSample = {
    type: "FeatureCollection",
    features: [],
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [serviceData, setServiceData] = useState<any>(geoJsonSample);
  const [oday, setOday] = useState<string>();

  let { id = "" } = useParams();

  useEffect(() => {
    if (id && oday) {
      vehiclePositionService?.fetchVehiclePositionGeoJson(id, oday).then((data) => {
        setServiceData(data);
        enqueueSnackbar(`Loaded Geo for ${oday}`);
      });
    }
  }, [id, oday, vehiclePositionService])

  const getRowId: GridRowIdGetter<VehiclePosition> = (item: VehiclePosition): GridRowId => {
    return item.tsi;
  }

  const getCenter = (): [number, number] => {
    const totalFeatures = serviceData?.features.length;

    const coordinates = serviceData?.features[Math.round(totalFeatures / 2) - 1].geometry.coordinates
    return [coordinates[1], coordinates[0]];

  }
  const [openTooltip, setOpenTooltip] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState<PopoverPosition>();
  const [popupData, setPopupData] = useState<any>({})
  const mapOnMouseOver = (event: any) => {
    setOpenTooltip(true);
  }

  const mapOnMouseOut = (event: any) => {
    setOpenTooltip(false);
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (eventWrapper: any) => {
    const { event, payload } = eventWrapper;

    setAnchorPosition({
      left: event.screenX,
      top: event.screenY,
    })
    console.log({
      left: event.screenX,
      top: event.screenY,
    });
    setOpenTooltip(true);
    setPopupData(payload.properties);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setOpenTooltip(false);
  };

  const open = Boolean(anchorEl);

  const onOdayChange = (event: SelectChangeEvent<string>, oday:string): any => {
    setOday(oday);
  }

  return (
    <div>
      <VehiclePositionLocationHeader veh={id} onChangeOday={onOdayChange} />
      {oday && oday != "" && serviceData.features.length > 0 &&


        <Map height={600} defaultZoom={12}
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          center={getCenter()}>
          <GeoJson
            data={serviceData}
            onMouseOver={handlePopoverOpen}
            onMouseOut={handlePopoverClose}
            styleCallback={(feature: { geometry: { type: string; }; }, hover: any) => {
              if (feature.geometry.type === "LineString") {
                return { strokeWidth: "1", stroke: "red" };
              }
              return {
                fill: "#d4e6ec99",
                strokeWidth: "2",
                stroke: "red",
                r: "2",
              };
            }}
          />

        </Map>
      }
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={openTooltip}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {/* <Typography sx={{ p: 1 }}>I use Popover. {popupData?.desi}</Typography> */}
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableBody>
              {Object.entries(popupData).map((row: any) => (
                <TableRow
                  key={row[0]}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row[0]}
                  </TableCell>
                  <TableCell align="right">{row[1]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Popover>
    </div>

  )
}