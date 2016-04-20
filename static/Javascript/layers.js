function initLayers() {
    var layers = viewer.scene.imageryLayers;
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

    var terraSeaIce = layers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        url: "https://map1a.vis.earthdata.nasa.gov/wmts-geo/wmts.cgi?TIME=2016-03-27&layer=MODIS_Terra_Sea_Ice",
        layer: "MODIS_Terra_Sea_Ice",
        style: "",
        format: "image/png",
        tileMatrixSetID: "EPSG4326_1km",
        maximumLevel: 8,
        tileWidth: 256,
        tileHeight: 256,
        tilingScheme: gibs.GeographicTilingScheme()
    }));

    terraSeaIce.alpha = 1.0;

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

    aquaSeaIce.alpha = 1.0;

/*
    var blackMarble = layers.addImageryProvider(new Cesium.TileMapServiceImageryProvider({
        url : '//cesiumjs.org/tilesets/imagery/blackmarble',
        maximumLevel : 8,
        credit : 'Black Marble imagery courtesy NASA Earth Observatory'
    }));

    blackMarble.alpha = 0.5; // 0.0 is transparent.  1.0 is opaque.
*/

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

    coastlines.alpha = 1.0;

    // Add terrian data source
    var terrainProvider = new Cesium.CesiumTerrainProvider({
        url: "//assets.agi.com/stk-terrain/world",
        requestVertexNormals: true
    });
    viewer.scene.terrainProvider = terrainProvider;

    // Add lighting effects
    viewer.scene.globe.enableLighting = true;

}

initLayers();