import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import { ChartDot, ChartPath, ChartPathProvider, ChartYLabel } from '@rainbow-me/animated-charts';
import { useSharedValue } from 'react-native-reanimated';


export const { width: SIZE } = Dimensions.get('window');


const Chart = ({ currentPrice, logoUrl, name, priceChangePercentage7d, sparkline, symbol }) => {

    const latestCurrentPrice = useSharedValue(currentPrice);

    const [chartReady, setChartReady] = useState(false);

    const priceChangeColor = priceChangePercentage7d > 0 ? '#34C759' : 'red';

    useEffect(() => {
        latestCurrentPrice.value = currentPrice;

        setTimeout(() => {
            setChartReady(true)
        }, 0)
    }, [currentPrice])

    const formatUSD = value => {
        'worklet';
        if (value === '') {
            return `$${latestCurrentPrice.value.toLocaleString('en-US', { currency: 'USD' })}`

        }

        const formattedValue = `$${parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
        return formattedValue;
    };
    return (
        <ChartPathProvider data={{ points: sparkline, smoothingStrategy: 'bezier' }}>
            <View style={styles.chartWrapper}>
                {/* Title */}
                <View style={styles.textWrapper}>
                    <View style={styles.upperTitle}>
                        <View style={styles.upperLeftTitle}>
                            <Image source={{ uri: logoUrl }} style={styles.image} />
                            <Text style={styles.subtitle}>{name},({symbol})</Text>
                        </View>
                        <Text style={styles.subTitle}>7d</Text>
                    </View>
                    <View style={styles.lowerTitles}>
                        <ChartYLabel
                            format={formatUSD}
                            style={styles.boldTitle}
                        />
                        {/* <Text style={styles.boldTitle}>${currentPrice.toLocaleString('en-US', { currency: 'USD' })}</Text> */}
                        <Text style={[styles.title, { color: priceChangeColor }]}>{priceChangePercentage7d.toFixed(4)}%</Text>
                    </View>
                </View>
                {chartReady ?
                    (<View style={styles.chartlineWrapper}>
                        <ChartPath height={SIZE / 2} stroke="black" width={SIZE} />
                        <ChartDot style={{ backgroundColor: 'black' }} />
                    </View>)
                    :
                    null
                }
            </View>
        </ChartPathProvider>
    )
}
const styles = StyleSheet.create({
    chartWrapper: {
        marginVertical: 16,
    },
    textWrapper: {
        marginHorizontal: 16,
    },
    upperTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    upperLeftTitle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 24,
        height: 24,
        marginRight: 4,
    },
    subtitle: {
        fontSize: 14,
        color: 'grey'
    },
    lowerTitles: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    boldTitle: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 16,
    },
    chartlineWrapper: {
        marginTop: 40,
    }
})
export default Chart
