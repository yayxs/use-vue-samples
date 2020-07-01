module.exports = {
    getdefaultTitle(obj) { // 初始化title
        obj = obj || {};
        let {text = '', show = false, left = 'center', top = 'auto', backgroundColor = 'transparent'} = obj;
        let o = {
            text: text,
            show: show,
            left: left,
            top: top,
            backgroundColor: backgroundColor,
            textStyle: {
                color: obj.color || '#fff',
                fontSize: obj.fontSize || 18
            }
        };
        return o;
    },
    getdefaultLegend(obj) { // 初始化Legend
        obj = obj || {};
        let {data = [], show = true, left = 'center', top = 'auto', right = 'auto', backgroundColor = 'transparent', icon = 'rect', borderRadius = 5, itemHeight = 14, itemWidth = 25, itemGap = 10} = obj;
        let o = {
            data: data,
            show: show,
            left: left,
            top: top,
            right: right,
            itemHeight: itemHeight, // 控制legend的显示高度
            itemWidth: itemWidth, // 控制legend的显示宽度
            itemGap: itemGap, // 控制每个legend之间的间距
            icon: icon,
            backgroundColor: backgroundColor,
            orient: obj.orient || 'horizontal',
            borderRadius: borderRadius,
            textStyle: {
                color: obj.color || '#fff',
                fontSize: obj.fontSize || 14
            }
        };
        return o;
    },
    getdefaultGrid(obj) { // 初始化grid
        obj = obj || {};
        let {show = false, left = '10%', top = '20%', borderColor = '#ccc', width = '75%', height = '70%'} = obj;
        let o = {
            show: show,
            left: left,
            top: top,
            borderColor: borderColor,
            width: width, // 参数传递需要传，by 吕雪婷
            height: height // 参数传递需要传，by 吕雪婷
        };
        return o;
    },
    getdefaultXYAxis(obj, direction) { // 初始化xy轴
        obj = obj || {};
        let {type = direction ? 'value' : 'category', name = '', nameLocation = 'end', nameGap = '15', data = [], min = type === 'value' ? 0 : null, max = type === 'value' ? 100 : null, boundaryGap = true} = obj;
        let o = {
            type: type, // 'value'  则必须要通过data设置类目数据
            name: name, //  坐标轴名称
            nameLocation: nameLocation, // 坐标轴名称显示位置
            nameTextStyle: {
                fontsize: obj.fontsize || 16, // 坐标轴名称字体大小
                color: obj.nameColor || '#fff'
            },
            interval: obj.interval,
            nameGap: nameGap, // 名称与轴线的距离
            data: data, // 类目数据  在category时有效
            min: min,
            max: max, // 最大值与最小值
            minInterval: obj.minInterval,
            splitLine: {
                show: obj.lineShow !== undefined ? obj.lineShow : false,
                lineStyle: {
                    color: obj.lineColor || '#eee',
                    type: obj.lineType || 'solid'
                }
            },
            axisLine: {
                show: obj.show !== undefined ? obj.show : true,
                lineStyle: {
                    color: obj.color || '#eee',
                    type: obj.axistype || 'solid'
                }
            },
            axisLabel: { // 坐标轴的label显示，需要设置interval，不然会隔一个显示一个，by 吕雪婷
                show: true,
                interval: obj.axisinterval || 0,
                formatter: obj.formatter,
                color: obj.axisColor || '#fff'
            },
            axisTick: {
                show: !(obj.axisTick === false)
            },
            boundaryGap: boundaryGap // 此控制了是否从0开始绘制，by 吕雪婷
        };
        return o;
    },
    getdefaultToltip(obj, callback, type) {
        obj = obj || {};
        let {trigger = 'axis', PointerType = type === 'bar' ? 'shadow' : 'line'} = obj;
        let o = {
            trigger: trigger,
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: PointerType // 默认为直线，可选为："line" | "shadow"
            }
        };
        if (callback) {
            o.formatter = callback;
        }
        return o;
    }
};
