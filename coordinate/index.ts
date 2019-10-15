interface Map {
    getMaxZoom(): any;
    [propName: string]: any;
}

interface BasData {
    w: number;
    h: number;
    x: number;
    y: number;
    pixel_m: number;
    [propName: string]: any;
}

interface Config {
    zoom: number;
    minZoom: number;
    maxZoom: number;
    pixel_cm: number;
    pixel_m: number;
    offset_flag: boolean;
}

interface LatLng {
    lat: number;
    lng: number;
}

interface Utm {
    utm_x: number;
    utm_y: number;
}

export class Coordinate {

    public map: Map; // map对象
    public data: BasData; // 基础属性
    public config: Config; // 配置属性

    constructor(map: Map, data: BasData, config: Config) {
        this.map = map;
        this.data = data;
        this.config = config;
    }

    /**
     *  utm坐标转地图经纬度坐标
     *
     *  @param {number} x utm_x
     *  @param {number} y utm_y
     *  @return {Array} 地图经纬度坐标
     */
    cordRealToMap(x: number, y: number): Array<number> {
        const map = this.map;
        const data = this.data;
        const config = this.config;
        x = x * data.pixel_zoom / config.pixel_m;
        y = data.h * data.pixel_zoom - (y * data.pixel_zoom / config.pixel_m);
        const zoom = map.getMaxZoom();
        const p = map.unproject([x, y], zoom);
        return [p.lat, p.lng];
    }

    /**
     *  地图经纬度坐标转utm坐标
     *
     *  @param {number} lat 纬度
     *  @param {number} lng 经度
     *  @return {Array} utm坐标
     */
    cordMapToReal(lat: number, lng: number): Array<number> {
        const map = this.map;
        const data = this.data;
        const config = this.config;
        const zoom = map.getMaxZoom();
        let {x, y} = map.project([lat, lng], zoom);
        x = x / data.pixel_zoom * config.pixel_m;
        y = (data.h * data.pixel_zoom - y) / data.pixel_zoom * config.pixel_m;
        return [x, y];
    }

    /**
     *  地图经纬度坐标转utm坐标
     *
     *  @param {LatLng} latLng 经纬度坐标
     *  @param {boolean} isReturnArray 是否返回数组
     *  @return {Utm | Array<number>} utm坐标对象或者utm坐标数组
     */
    latLngToUtm(latLng: LatLng, isReturnArray: boolean = false): Utm | Array<number> {
        const {lat, lng} = latLng;
        const [x, y] = this.cordMapToReal(lat, lng);
        const utm_x = x + this.data.x;
        const utm_y = y + this.data.y;
        return isReturnArray ? [utm_x, utm_y] : {utm_x, utm_y};
    }

    /**
     *  地图经纬度坐标转utm坐标
     *
     *  @param {Utm} utm utm坐标
     *  @param {boolean} isReturnArray 是否返回数组
     *  @return {LatLng | Array<number>} 经纬度坐标对象或者经纬度坐标数组
     */
    utmToLatLng(utm: Utm, isReturnArray: boolean = false): LatLng | Array<number> {
        const {utm_x, utm_y} = utm;
        const {x, y} = this.data;
        const [lat, lng] = this.cordRealToMap(utm_x - x, utm_y - y);
        return isReturnArray ? [lat, lng] : {lat, lng};
    }

}