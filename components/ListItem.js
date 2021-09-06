import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

const ListItem = ({ name, symbol, currentPrice, priceChangePercentage7d, logoUrl, onPress }) => {
    const priceChangeColor = priceChangePercentage7d > 0 ? '#34C759' : 'red'
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.itemWrapper}>
                {/* LEft Side */}
                <View style={styles.leftWrapper}>
                    <Image
                        style={styles.coinlogo}
                        source={{ uri: logoUrl }}
                    />
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>{name}</Text>
                        <Text style={styles.subtitle}>{symbol.toUpperCase()}</Text>
                    </View>

                </View>
                {/* Right Side */}
                <View style={styles.rightWrapper}>
                    <Text style={styles.title}>${currentPrice.toLocaleString('en-US', { currency: 'USD' })}</Text>
                    <Text style={styles.subtitle, { color: priceChangeColor }}>{priceChangePercentage7d.toFixed(4)}%</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    itemWrapper: {
        paddingHorizontal: 16,
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleWrapper: {
        marginLeft: 8,
    },
    title: {
        fontSize: 18,

    },
    subtitle: {
        marginTop: 4,
        fontSize: 14,
        color: '#A9ABB1'
    },
    coinlogo: {
        width: 50,
        height: 50,
    },
    rightWrapper: {
        alignItems: 'flex-end',
    }
})
export default ListItem
