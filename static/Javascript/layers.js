var layers = viewer.scene.imageryLayers;
//layers stacked on globe in order, top-down, so put base layers first

/*
var correctedReflectance = layers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    url: "//map1a.vis.earthdata.nasa.gov/wmts-geo/wmts.cgi?TIME=2016-03-27&layer=VIIRS_SNPP_CorrectedReflectance_TrueColor",
    layer: "MODIS_Terra_CorrectedReflectance_TrueColor",
    style: "",
    format: "image/jpeg",
    tileMatrixSetID: "EPSG4326_250m",
    maximumLevel: 8,
    tileWidth: 256,
    tileHeight: 256,
    tilingScheme: gibs.GeographicTilingScheme()
}));

correctedReflectance.alpha = 1.0;    // 0.0 is transparent, 1.0 is opaque
*/

/*
var night = layers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    url: "//map1a.vis.earthdata.nasa.gov/wmts-geo/wmts.cgi?layer=VIIRS_CityLights_2012",
    layer: "VIIRS_CityLights_2012",
    style: "",
    format: "image/jpeg",
    tileMatrixSetID: "EPSG4326_500m",
    maximumLevel: 8,
    tileWidth: 256,
    tileHeight: 256,
    tilingScheme: gibs.GeographicTilingScheme()
}));

night.alpha = 1.0;
*/

var soilTemperature = layers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    url: "//map1b.vis.earthdata.nasa.gov/wmts-geo/wmts.cgi?TIME=2015-06-21&layer=SMAP_L4_Soil_Temperature_Layer_1",
    layer: "SMAP_L4_Soil_Temperature_Layer_1",
    style: "",
    format: "image/png",
    tileMatrixSetID: "EPSG4326_2km",
    maximumLevel: 8,
    tileWidth: 256,
    tileHeight: 256,
    tilingScheme: gibs.GeographicTilingScheme()
}));

var soilMoisture = layers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    url: "//map1a.vis.earthdata.nasa.gov/wmts-geo/wmts.cgi?TIME=2015-06-27&layer=SMAP_L4_Analyzed_Root_Zone_Soil_Moisture",
    layer: "SMAP_L4_Analyzed_Root_Zone_Soil_Moisture",
    style: "",
    format: "image/png",
    tileMatrixSetID: "EPSG4326_2km",
    maximumLevel: 8,
    tileWidth: 256,
    tileHeight: 256,
    tilingScheme: gibs.GeographicTilingScheme()
}));

var terraSeaIce = layers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    url: "//map1a.vis.earthdata.nasa.gov/wmts-geo/wmts.cgi?TIME=2016-03-27&layer=MODIS_Terra_Sea_Ice",
    layer: "MODIS_Terra_Sea_Ice",
    style: "",
    format: "image/png",
    tileMatrixSetID: "EPSG4326_1km",
    maximumLevel: 8,
    tileWidth: 256,
    tileHeight: 256,
    tilingScheme: gibs.GeographicTilingScheme()
}));

var aquaSeaIce = layers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    url: "//map1a.vis.earthdata.nasa.gov/wmts-geo/wmts.cgi?TIME=2016-03-27&layer=MODIS_Aqua_Sea_Ice",
    layer: "MODIS_Aqua_Sea_Ice",
    style: "",
    format: "image/png",
    tileMatrixSetID: "EPSG4326_1km",
    maximumLevel: 8,
    tileWidth: 256,
    tileHeight: 256,
    tilingScheme: gibs.GeographicTilingScheme()
}));

var terraSnowCover = layers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    url: "//map1a.vis.earthdata.nasa.gov/wmts-geo/wmts.cgi?TIME=2014-03-30&layer=MODIS_Terra_Snow_Cover",
    layer: "MODIS_Terra_Snow_Cover",
    style: "",
    format: "image/png",
    tileMatrixSetID: "EPSG4326_500m",
    maximumLevel: 8,
    tileWidth: 256,
    tileHeight: 256,
    tilingScheme: gibs.GeographicTilingScheme()
}));

var aquaSnowCover = layers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    url: "//map1b.vis.earthdata.nasa.gov/wmts-geo/wmts.cgi?TIME=2014-03-30&layer=MODIS_Aqua_Snow_Cover",
    layer: "MODIS_Aqua_Snow_Cover",
    style: "",
    format: "image/png",
    tileMatrixSetID: "EPSG4326_500m",
    maximumLevel: 8,
    tileWidth: 256,
    tileHeight: 256,
    tilingScheme: gibs.GeographicTilingScheme()
}));

//ERROR: Cross-Origin Resource Sharing (no Access-Control-Allow-Origin header)
/*
var glacierData = layers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
    url: "//www.glims.org/mapservice?layer=glac_lines",
}));

glacierData.alpha = 0.5;
*/
//http://www.glims.org/mapservice?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=wgi_points&CRS=EPSG%3A3857&STYLES=&WIDTH=1167&HEIGHT=1017&BBOX=-11023510.415200116%2C-4152293.6083030845%2C-5314581.646636872%2C822839.6887224675
//https://map1a.vis.earthdata.nasa.gov/wmts-geo/wmts.cgi?TIME=2014-03-30&layer=MODIS_Aqua_Snow_Cover&tilematrixset=EPSG4326_500m&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=0&TileCol=0&TileRow=0

var coastlines = layers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    url: "//map1a.vis.earthdata.nasa.gov/wmts-geo/wmts.cgi?l=Reference_Features",
    layer: "Reference_Features",
    style: "",
    format: "image/png",
    tileMatrixSetID: "EPSG4326_250m",
    maximumLevel: 8,
    tileWidth: 256,
    tileHeight: 256,
    tilingScheme: gibs.GeographicTilingScheme()
}));

// Add terrian data source
var terrainProvider = new Cesium.CesiumTerrainProvider({
    url: "//assets.agi.com/stk-terrain/world",
    requestVertexNormals: true
});
viewer.scene.terrainProvider = terrainProvider;

// Add lighting effects
//viewer.scene.globe.enableLighting = true;
