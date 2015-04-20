(function () {
  var iw = new google.maps.InfoWindow();
  var coordinates = new Array();
  var markers = new Array();

  // Manhattan coordinates
  var coords = new google.maps.LatLng(40.783435, -73.966249);

  var mapOptions = {
    zoom: 13,
    center: coords,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var mapDom = document.getElementById("map");
  var map = new google.maps.Map(mapDom, mapOptions);

  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [google.maps.drawing.OverlayType.POLYGON]
    },
    polygonOptions: {
      editable: true
    }
  });

  drawingManager.setMap(map);

  google.maps.event.addListener(drawingManager, "overlaycomplete", function(event) {
    var i, l, c;
    var points = [];
    var coords = event.overlay.getPath().getArray();

    for (i = 0, l = coords.length; i < l; i++) {
      c = coords[i];
      // Coordinates as tuples
      points.push({ x: c.k, y: c.D});
    }

    $.ajax({
      method: "POST",
      url: "/find-listings",
      dataType: "json",
      data: {
        points: points
      }
    });
  });
})();
