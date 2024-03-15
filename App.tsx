import {useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Chip} from '@rneui/base';
import {darken, desaturate, lighten, mix} from "polished";

export default function App() {
    const [level, setLevel] = useState(1);
    const rectCount = useMemo(() => (level + 1) * (level + 1), [level]);
    const maxLevel = 10;
    const [timeCount, setTimeCount] = useState(30);
    const [difficultyType, setDifficulty] = useState(3);
    const difficulty = useMemo(() => {
        switch (difficultyType) {
            case 1:
                return 0.15;
            case 2:
                return 0.35;
            case 3:
                return 0.5;
            default:
                return 0.15;
        }
    }, [difficultyType]);
    const currentColor = useMemo(() => {
        // 随机颜色
        return `#${Math.random().toString(16).slice(2, 8)}`;
    }, [level]);
    const activeIndex = useMemo(() => {
        return Math.floor(Math.random() * rectCount);
    }, [rectCount]);
    const activeColor = useMemo(() => {
        const similarityIncrement = 1 / maxLevel;
        const similarity = level * similarityIncrement;
        return mix(similarity, currentColor, darken(difficulty, currentColor));
    }, [level, currentColor, difficulty]);
    return <View style={styles.container}>
        <View style={styles.actionContainer}>
            <Chip title={`Level: ${level}/${maxLevel}`}/>
            <Chip title={` Time: ${timeCount}`} type={'outline'}/>
            <Button title={'Reload'} size={'sm'}/>

        </View>
        <View style={styles.rectContainer}>
            {
                Array.from({length: rectCount}).map((_, i) => {
                    return <View key={i} style={{
                        width: `${100 / (level + 1)}%`,
                        height: `${100 / (level + 1)}%`,
                        padding: 3,
                    }}>
                        <View
                            onTouchStart={() => {
                                if (i === activeIndex) {
                                    if (level < maxLevel) {
                                        setLevel(level + 1);
                                    }
                                }
                            }}
                            style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: i === activeIndex ? activeColor : currentColor,
                                borderRadius: 5,
                            }}/>
                    </View>
                })
            }
        </View>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        display: 'flex'
    },
    actionContainer: {
        width: '100%',
        padding: 10,
        fontSize: 18,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    rectContainer: {
        width: 360,
        height: 360,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 10,
    },
});
