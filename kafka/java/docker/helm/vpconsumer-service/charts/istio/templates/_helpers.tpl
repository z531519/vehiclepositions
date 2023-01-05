{{/*
Expand the name of the chart.
*/}}
{{- define "vpconsumer-service-istio.name" -}}
{{- default "vpconsumer-service" .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "vpconsumer-service-istio.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default "vpconsumer-service" .Values.nameOverride }}
{{- printf "%s" $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "vpconsumer-service-istio.chart" -}}
{{- printf "%s-%s" "vpconsumer-service-Istio" .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "vpconsumer-service-istio.labels" -}}
helm.sh/chart: {{ include "vpconsumer-service-istio.chart" . }}
{{ include "vpconsumer-service-istio.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app: vpconsumer-service
{{- end }}

{{/*
Selector labels
*/}}
{{- define "vpconsumer-service-istio.selectorLabels" -}}
app.kubernetes.io/name: {{ include "vpconsumer-service-istio.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "vpconsumer-service-istio.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "vpconsumer-service-istio.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}
