import * as React from 'react';
import { useEffect, useState } from 'react';
import { Map, GeoJson } from "pigeon-maps"

import { Paper, Popover, PopoverPosition, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';



export default function VehiclePositionGeoMap({ geoJsonData }: any) {

  const geoJsonSample = {
    type: "FeatureCollection",
    features: [],
  };

  useEffect(() => {
    getCenter();
  }, [geoJsonData])


  const getCenter = (): void => {
    if (geoJsonData.features.length == 0) {
      return;
    }
    const totalFeatures = geoJsonData.features.length;

    const coordinates = geoJsonData.features[Math.round(totalFeatures / 2) - 1].geometry.coordinates
    const computed: [number, number] = [coordinates[1], coordinates[0]];
    setCenter(computed);
  }

  const [center, setCenter] = useState<[number, number]>();
  const [openTooltip, setOpenTooltip] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState<PopoverPosition>();
  const [popupData, setPopupData] = useState<any>({})

  const handlePopoverOpen = (eventWrapper: any) => {
    const { event, payload } = eventWrapper;

    setAnchorPosition({
      left: event.screenX,
      top: event.screenY,
    })

    setOpenTooltip(true);
    setPopupData(payload.properties);
  };

  const handlePopoverClose = () => {
    setOpenTooltip(false);
  };


  return (
    <div>

      <Map height={600} defaultZoom={12}
        aria-haspopup="true"
        center={center}>
        {geoJsonData.features.length > 0 &&
          <GeoJson
            data={geoJsonData}
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
        }

      </Map>

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
    </div >

  )
}