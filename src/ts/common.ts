
export interface Player {
    name: string
    seat: string
    point: number
    riichi: boolean
}

export interface PlayerRef {
    visible: boolean,
    inputModel: string,
    key: number
}

export enum Language{
    zhCN = "中文",
    jaJP = "日本語",
    enUS = "English"
}

export enum GameLength{
    quarterGame = "eastWind",
    halfGame = "halfGame",
    fullGame = "fullGame"
}

//数字转汉字表示
//仅支持整数
export function toDigitString(digit: number | string , lang: Language) : string {
    if (!(lang == Language.zhCN || lang == Language.jaJP))
    {
        return String(digit);
    }
    digit = typeof digit === 'number' ? String(digit) : digit;
    let zh = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    let unit = ['千', '百', '十', ''];
    let quot = ['万', '亿', '兆', '京', '垓', '秭', '穰', '沟', '涧', '正', '载', '极', '恒河沙', '阿僧祗', '那由他', '不可思议', '无量', '大数'];
    if(lang = Language.jaJP)
    {
        zh = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        unit = ['千', '百', '十', ''];
        quot = ['万', '億', '兆', '京', '垓', '秭', '穰', '溝', '澗', '正', '載', '極', '恒河沙', '阿僧祇', '那由他', '不可思議', '無量', '大数'];
    }
    
    let breakLen = Math.ceil(digit.length / 4);
    let notBreakSegment = digit.length % 4 || 4;
    let segment:string;
    let zeroFlag = [], allZeroFlag = [];
    let result = '';
    
    while (breakLen > 0) {
        if (!result) { // 第一次执行
            segment = digit.slice(0, notBreakSegment);
            let segmentLen = segment.length;
            for (let i = 0; i < segmentLen; i++) {
                if (Number(segment[i]) != 0) {
                    if (zeroFlag.length > 0) {
                        result += '零' + zh[Number(segment[i])] + unit[4 - segmentLen + i];
                        // 判断是否需要加上 quot 单位
                        if (i === segmentLen - 1 && breakLen > 1) {
                            result += quot[breakLen - 2];
                        }
                        zeroFlag.length = 0;
                    } else {
                        result += zh[Number(segment[i])] + unit[4 - segmentLen + i];
                        if (i === segmentLen - 1 && breakLen > 1) {
                            result += quot[breakLen - 2];
                        }
                    }
                } else {
                    // 处理为 0 的情形
                    if (segmentLen == 1) {
                        result += zh[Number(segment[i])];
                        break;
                    }
                    zeroFlag.push(segment[i]);
                    continue;
                }
            }
        } else {
            segment = digit.slice(notBreakSegment, notBreakSegment + 4);
            notBreakSegment += 4;

            for (let j = 0; j < segment.length; j++) {
                if (Number(segment[j]) != 0) {
                    if (zeroFlag.length > 0) {
                        // 第一次执行zeroFlag长度不为0，说明上一个分区最后有0待处理
                        if (j === 0) {
                            result += quot[breakLen - 1] + zh[Number(segment[j])] + unit[j];
                        } else {
                            result += '零' + zh[Number(segment[j])] + unit[j];
                        }
                        zeroFlag.length = 0;
                    } else {
                        result += zh[Number(segment[j])] + unit[j];
                    }
                    // 判断是否需要加上 quot 单位
                    if (j === segment.length - 1 && breakLen > 1) {
                        result += quot[breakLen - 2];
                    }
                } else {
                  // 第一次执行如果zeroFlag长度不为0, 且上一划分不全为0
                    if (j === 0 && zeroFlag.length > 0 && allZeroFlag.length === 0) {
                        result += quot[breakLen - 1];
                        zeroFlag.length = 0;
                        zeroFlag.push(segment[j]);
                    } else if (allZeroFlag.length > 0) {
                        // 执行到最后
                        if (breakLen == 1) {
                          result += '';
                        } else {
                          zeroFlag.length = 0;
                        }
                    } else {
                      zeroFlag.push(segment[j]);
                    }
                  
                    if (j === segment.length - 1 && zeroFlag.length === 4 && breakLen !== 1) {
                        // 如果执行到末尾
                        if (breakLen === 1) {
                          allZeroFlag.length = 0;
                          zeroFlag.length = 0;
                          result += quot[breakLen - 1];
                        } else {
                          allZeroFlag.push(segment[j]);
                        }
                    }
                    continue;
                }
            }
        }
        --breakLen;
    }
    return result;
}