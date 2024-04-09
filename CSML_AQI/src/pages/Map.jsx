import React, { useEffect, useRef } from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Radar } from 'lucide-react';

const MapWrapper = ({ locations }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    let google = window.google;
    if (!google || !locations || locations.length === 0) return;

    let map = mapRef.current;
    const mapOptions = {
      center: { lat: 9.9312, lng: 76.2673 },
      zoom: 12,
      scrollwheel: false,
      styles: [
        /* Your map styles */
      ],
    };

    map = new google.maps.Map(map, mapOptions);

    // Define a custom marker icon
    const markerIcon = {
      url: "https://icons.veryicon.com/png/o/miscellaneous/small-yellow-icon/location-134.png",
      scaledSize: new google.maps.Size(40, 40), // Adjust the size of the marker icon as needed
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(20, 40), // Position the anchor point to the center-bottom of the marker
    };

    // Loop through locations array and add markers for each location
    locations.forEach((location, index) => {
      const { lat, lng, title } = location;
      const myLatlng = new google.maps.LatLng(lat, lng);

      const marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        animation: google.maps.Animation.DROP,
        title: title || `Marker ${index + 1}`,
        icon: markerIcon, // Set the custom marker icon
      });

      const contentString = title || `Marker ${index + 1}`;

      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });

      google.maps.event.addListener(marker, "click", function () {
        infowindow.open(map, marker);
      });
    });

    return () => {
      google.maps.event.clearListeners(map, "click");
    };
  }, [locations]);

  return <div ref={mapRef} style={{ height: "400px" }} />;
};

const Map = () => {
  // Define metro station locations in Kochi city
  const metroStations = [
    { lat: 10.007, lng: 76.353, title: "Aluva" },
    { lat: 10.005, lng: 76.303, title: "Ambattukavu" },
    { lat: 10.006, lng: 76.306, title: "Muttom" },
    { lat: 9.999, lng: 76.299, title: "Kalamassery" },
    { lat: 9.997, lng: 76.334, title: "Pulinchodu" },
    { lat: 9.979, lng: 76.308, title: "Companypady" },
    { lat: 9.965, lng: 76.281, title: "Pathadippalam" },
    { lat: 9.957, lng: 76.281, title: "Edappally" },
    { lat: 9.949, lng: 76.281, title: "Changampuzha Park" },
    { lat: 9.939, lng: 76.277, title: "Palarivattom" },
    { lat: 9.932, lng: 76.267, title: "Jawaharlal Nehru Stadium" },
    { lat: 9.928, lng: 76.267, title: "Kaloor" },
    { lat: 9.923, lng: 76.267, title: "Lisie" },
    { lat: 9.914, lng: 76.266, title: "MG Road" },
    { lat: 9.908, lng: 76.266, title: "Maharaja's College" },
    { lat: 9.905, lng: 76.265, title: "Ernakulam South" },
    { lat: 9.888, lng: 76.268, title: "Kadavanthra" },
    { lat: 9.878, lng: 76.272, title: "Elamkulam" },
    { lat: 9.87, lng: 76.274, title: "Vyttila" },
    { lat: 9.863, lng: 76.283, title: "Thaikoodam" },
    { lat: 9.853, lng: 76.291, title: "Petta" },
    { lat: 9.841, lng: 76.301, title: "MG Road" },
    { lat: 9.835, lng: 76.306, title: "Thykoodam" },
    { lat: 9.826, lng: 76.31, title: "Pettah" },
    { lat: 9.814, lng: 76.318, title: "SNG College" },
  ];
  

  return (
    <div className="p-5">
      <Row>
        <Col md="12">
          <Card className="rounded-lg shadow-lg border">
            <CardHeader className="p-3 bg-transparent">Google Maps</CardHeader>
            <CardBody>
              <div
                id="map"
                className="map"
                style={{ position: "relative", overflow: "hidden" }}
              >
                <MapWrapper locations={metroStations} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Map;
