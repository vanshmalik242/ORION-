"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";

interface MapProps {
  points: { lat: number; lon: number }[];
}

export default function MapComponent({ points }: MapProps) {
  return (
    <div className="h-[650px] w-full rounded-2xl overflow-hidden glass border border-slate-700 shadow-[0_0_30px_rgba(0,0,0,0.5)] z-0">
      <MapContainer 
        center={[20, 0]} 
        zoom={2} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%', background: '#020617' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {points.map((pt, i) => (
          <CircleMarker
            key={i}
            center={[pt.lat, pt.lon]}
            radius={6}
            pathOptions={{ 
              color: '#ef4444', 
              fillColor: '#f87171', 
              fillOpacity: 0.8,
              weight: 2
            }}
          >
            <Popup className="bg-slate-900 border-slate-700 text-slate-200 p-0 shadow-lg !rounded-xl">
              <div className="p-2">
                <span className="font-mono text-xs font-semibold text-red-400">Threat Origin</span>
                <br/>
                <span className="font-mono text-xs text-slate-300 mt-1 inline-block">Lat: {pt.lat.toFixed(4)}<br/>Lon: {pt.lon.toFixed(4)}</span>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
