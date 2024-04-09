  import React from 'react';
  import '../components/blink.css';
  import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';

export default function Readings() {
  const metroStations = [
    { title: "Aluva", aqi: "Good", pm25: 10, pm10: 20, no2: 5, so2: 3 },
    { title: "Ambattukavu", aqi: "Action Required", pm25: 20, pm10: 30, no2: 8, so2: 4 },
    { title: "Muttom", aqi: "Moderate", pm25: 15, pm10: 25, no2: 6, so2: 3 },
    { title: "Kalamassery", aqi: "Good", pm25: 12, pm10: 22, no2: 4, so2: 2 },
    { title: "Pulinchodu", aqi: "Moderate", pm25: 18, pm10: 28, no2: 7, so2: 4 },
    { title: "Companypady", aqi: "Moderate", pm25: 17, pm10: 27, no2: 7, so2: 4 },
    { title: "Pathadippalam", aqi: "Action Required", pm25: 11, pm10: 35, no2: 4, so2: 3 },
    { title: "Edappally", aqi: "Good", pm25: 10, pm10: 20, no2: 5, so2: 3 },
    { title: "Changampuzha Park", aqi: "Moderate", pm25: 19, pm10: 29, no2: 7, so2: 4 },
    { title: "Palarivattom", aqi: "Action Required", pm25: 16, pm10: 26, no2: 19, so2: 4 },
    // Add more metro station data as needed
  ];

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableHeadCell>LOCATION</TableHeadCell>
          <TableHeadCell>Mosquito Population Threshold</TableHeadCell>
          <TableHeadCell>Albopictus (Chikungunya)</TableHeadCell>
          <TableHeadCell>Aegypti (Dengue)</TableHeadCell>
          <TableHeadCell>Anopheles (Malaria)</TableHeadCell>
          <TableHeadCell>West Nile virus (Culex)</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {metroStations.map((station, index) => (
            <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {station.title}
              </TableCell>
              <TableCell className={
                station.aqi.toLowerCase() === 'good' ? 'text-green-500' :
                station.aqi.toLowerCase() === 'moderate' ? 'text-yellow-500' :
                station.aqi.toLowerCase() === 'action required' ? 'blinking-text text-red-500' :
                ''
              }>
                {station.aqi}
              </TableCell>
              <TableCell>{station.pm25}</TableCell>
              <TableCell>{station.pm10}</TableCell>
              <TableCell>{station.no2}</TableCell>
              <TableCell>{station.so2}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}