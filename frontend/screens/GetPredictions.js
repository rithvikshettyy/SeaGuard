import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, FlatList, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { Env } from '../constants/env';

const BASE_URL = Env.BASE_URL;

// A simple component to visualize confidence
const ConfidenceBar = ({ value }) => {
    const percentage = parseFloat(value);
    return (
        <View style={styles.confidenceBarContainer}>
            <View style={[styles.confidenceBar, { width: `${percentage}%` }]} />
        </View>
    );
};


const GetPredictionsScreen = ({ route }) => {
    const { imageUri } = route.params;
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPredictions = async () => {
            try {
                const formData = new FormData();
                const filename = imageUri.split('/').pop();
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : `image`;

                formData.append('file', { uri: imageUri, name: filename, type });

                const response = await fetch(`${BASE_URL}/fish-classify/predict`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (!response.ok) {
                    const errText = await response.text();
                    throw new Error(`Failed to get predictions: ${errText}`);
                }

                const data = await response.json();
                
                // Filter predictions to be >= 50%
                const filteredPredictions = (data.top_predictions || []).filter(p => {
                    const confidenceValue = parseFloat(p.confidence.replace('%', ''));
                    return confidenceValue >= 50;
                });

                // Get top 3
                const top3Predictions = filteredPredictions.slice(0, 3);
                setPredictions(top3Predictions);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getPredictions();
    }, [imageUri]);

    const renderTopPrediction = (item) => (
        <View style={styles.topPredictionCard}>
            <Text style={styles.topPredictionLabel}>Top Match</Text>
            <Text style={styles.topSpeciesText}>{item.species}</Text>
            <Text style={styles.topConfidenceText}>{item.confidence}</Text>
            <ConfidenceBar value={item.confidence} />
        </View>
    );

    const renderOtherPrediction = ({ item, index }) => (
        <View style={styles.predictionItem}>
            <Text style={styles.rankText}>{index + 2}</Text>
            <Text style={styles.speciesText}>{item.species}</Text>
            <View style={{flex: 1, marginLeft: 15}}>
                <ConfidenceBar value={item.confidence} />
            </View>
            <Text style={styles.confidenceText}>{item.confidence}</Text>
        </View>
    );

    const renderContent = () => {
        if (loading) {
            return <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />;
        }
        if (error) {
            return <Text style={styles.errorText}>Error: {error}</Text>;
        }
        if (predictions.length === 0) {
            return (
                <View style={styles.noResultContainer}>
                    <Ionicons name="search-outline" size={60} color={COLORS.lightText} />
                    <Text style={styles.noResultText}>No high-confidence match found.</Text>
                    <Text style={styles.noResultSubText}>Please try a different or clearer image for better results.</Text>
                </View>
            );
        }

        const topPrediction = predictions[0];
        const otherPredictions = predictions.slice(1);

        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                {renderTopPrediction(topPrediction)}
                {otherPredictions.length > 0 && (
                    <>
                        <Text style={styles.listHeader}>Other Possible Matches</Text>
                        <FlatList
                            data={otherPredictions}
                            renderItem={renderOtherPrediction}
                            keyExtractor={(item) => item.species}
                            scrollEnabled={false}
                        />
                    </>
                )}
            </ScrollView>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Classification Results</Text>
            </View>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <View style={styles.resultsContainer}>
                {renderContent()}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F7', // Lighter background
        paddingTop: 40, // Added top margin
    },
    header: {
        paddingBottom: 15,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    image: {
        width: '90%',
        height: 220,
        resizeMode: 'cover',
        borderRadius: 15,
        alignSelf: 'center',
        marginBottom: 20,
    },
    resultsContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
    errorText: {
        textAlign: 'center',
        marginTop: 50,
        color: 'red',
        fontSize: 16,
        paddingHorizontal: 20,
    },
    noResultContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    noResultText: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.text,
        marginTop: 15,
    },
    noResultSubText: {
        fontSize: 14,
        color: COLORS.lightText,
        textAlign: 'center',
        marginTop: 8,
    },
    listHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginTop: 25,
        marginBottom: 15,
    },
    topPredictionCard: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#E0E0E0'
    },
    topPredictionLabel: {
        fontSize: 14,
        color: COLORS.lightText,
        marginBottom: 10,
    },
    topSpeciesText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginVertical: 5,
    },
    topConfidenceText: {
        fontSize: 20,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 15,
    },
    predictionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
    },
    rankText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.lightText,
        marginRight: 15,
    },
    speciesText: {
        fontSize: 17,
        fontWeight: '600',
        color: COLORS.text,
        width: 120, // Fixed width to align bars
    },
    confidenceText: {
        fontSize: 16,
        color: COLORS.text,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    confidenceBarContainer: {
        height: 8,
        flex: 1,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        overflow: 'hidden',
    },
    confidenceBar: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 4,
    }
});

export default GetPredictionsScreen;