import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { QUESTIONS } from './constants';
import { COLORS, FONTS, SPACING, LAYOUT, SHADOWS, TEXT_SHADOWS } from '../../styles/theme';

const { width } = Dimensions.get('window');
const ITEM_HEIGHT = 400;
const VISIBLE_ITEMS = 3;
const NUMBERS = Array.from({ length: 9 }, (_, i) => i + 1);
const NUMBER_PADDING = 40;
const NUMBER_SIZE = width - (NUMBER_PADDING * 2);
const DEFAULT_VALUE = 6;
const DEFAULT_SCROLL_POSITION = (DEFAULT_VALUE - 1) * ITEM_HEIGHT;

interface QuestionsProps {
  currentQuestion: number;
  selectedValue: number | null;
  onValueSelect: (value: number) => void;
  onConfirm: () => void;
  onBack?: () => void;
  onClose: () => void;
  backgroundColorAnim: Animated.Value;
  questionPositionAnim: Animated.Value;
}

export const Questions: React.FC<QuestionsProps> = ({
  currentQuestion,
  selectedValue,
  onValueSelect,
  onConfirm,
  onBack,
  onClose,
  backgroundColorAnim,
  questionPositionAnim,
}) => {
  const scrollY = useRef(new Animated.Value(DEFAULT_SCROLL_POSITION)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Start question position animation immediately
    Animated.spring(questionPositionAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 10,
    }).start();

    // Set initial value and scroll position only if no value is selected
    const timer = setTimeout(() => {
      // Calculate the scroll position based on the current value
      const scrollPosition = ((selectedValue || DEFAULT_VALUE) - 1) * ITEM_HEIGHT;
      
      // Only set default value if none exists
      if (selectedValue === null) {
        onValueSelect(DEFAULT_VALUE);
      }
      
      // Scroll to the current value's position
      scrollViewRef.current?.scrollTo({
        y: scrollPosition,
        animated: false,
      });
      
      // Set background color to match current value
      backgroundColorAnim.setValue(selectedValue || DEFAULT_VALUE);
    }, 100);

    return () => clearTimeout(timer);
  }, [currentQuestion, selectedValue]);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    scrollY.setValue(offsetY);
    
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const value = NUMBERS[index];
    
    if (value !== selectedValue) {
      onValueSelect(value);
      Animated.timing(backgroundColorAnim, {
        toValue: value,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleMomentumEnd = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    scrollViewRef.current?.scrollTo({
      y: index * ITEM_HEIGHT,
      animated: true,
    });
  };

  const renderNumbers = () => {
    return NUMBERS.map((number, index) => {
      const inputRange = [
        (index - 1) * ITEM_HEIGHT,
        index * ITEM_HEIGHT,
        (index + 1) * ITEM_HEIGHT,
      ];

      const scale = scrollY.interpolate({
        inputRange,
        outputRange: [0.3, 1, 0.3],
        extrapolate: 'clamp',
      });

      const opacity = scrollY.interpolate({
        inputRange,
        outputRange: [0.2, 1, 0.2],
        extrapolate: 'clamp',
      });

      const translateY = scrollY.interpolate({
        inputRange,
        outputRange: [ITEM_HEIGHT * 0.75, 0, -ITEM_HEIGHT * 0.75],
        extrapolate: 'clamp',
      });

      return (
        <Animated.View
          key={number}
          style={[
            styles.numberContainer,
            {
              transform: [
                { scale },
                { translateY }
              ],
              opacity,
              width: NUMBER_SIZE,
              height: ITEM_HEIGHT,
            },
          ]}
        >
          <Text style={[styles.number, { fontSize: NUMBER_SIZE }]}>{number}</Text>
        </Animated.View>
      );
    });
  };

  return (
    <>
      <Animated.View style={[styles.navigationButtons, {
        opacity: questionPositionAnim,
        transform: [{
          translateY: questionPositionAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-20, 0],
          }),
        }],
      }]}>
        {currentQuestion > 0 && (
          <TouchableOpacity style={styles.navBackButton} onPress={onBack}>
            <Text style={styles.navBackButtonText}>←</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          style={styles.navCloseButton} 
          onPress={onClose}
          activeOpacity={0.7}
        >
          <Text style={styles.navCloseButtonText}>×</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.questionContainer, {
        transform: [{
          translateY: questionPositionAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [LAYOUT.SCREEN_HEIGHT * 0.3, 0],
          }),
        }],
      }]}>
        <Text style={styles.questionText}>
          {QUESTIONS[currentQuestion].text}
        </Text>
        <Text style={styles.questionDescription}>
          {QUESTIONS[currentQuestion].description}
        </Text>
      </Animated.View>

      <Animated.View style={[styles.pickerContainer, {
        opacity: questionPositionAnim,
        transform: [{
          translateY: questionPositionAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [LAYOUT.SCREEN_HEIGHT * 0.5, 0],
          }),
        }],
      }]}>
        <View style={styles.scrollContainer}>
          <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            onScroll={handleScroll}
            onMomentumScrollEnd={handleMomentumEnd}
            scrollEventThrottle={16}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingHorizontal: NUMBER_PADDING }
            ]}
          >
            {renderNumbers()}
          </ScrollView>
        </View>
      </Animated.View>

      <View style={styles.progressContainer}>
        {QUESTIONS.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index === currentQuestion && styles.progressDotActive,
              index < currentQuestion && styles.progressDotCompleted,
            ]}
          />
        ))}
      </View>

      <TouchableOpacity 
        style={[
          styles.setScoreButton,
          !selectedValue && styles.setScoreButtonDisabled
        ]}
        onPress={onConfirm}
        disabled={!selectedValue}
      >
        <Text style={styles.setScoreButtonText}>
          SET SCORE
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  navigationButtons: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 20,
    left: SPACING.LG,
    right: SPACING.LG,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  navBackButton: {
    padding: SPACING.SM,
  },
  navBackButtonText: {
    color: COLORS.WHITE,
    fontSize: 32,
    fontFamily: FONTS.MONUMENT_EXTENDED,
    lineHeight: 32,
    ...TEXT_SHADOWS.SMALL,
  },
  navCloseButton: {
    padding: SPACING.SM,
    marginLeft: 'auto',
  },
  navCloseButtonText: {
    color: COLORS.WHITE,
    fontSize: 32,
    fontFamily: FONTS.MONUMENT_EXTENDED,
    lineHeight: 32,
    ...TEXT_SHADOWS.SMALL,
  },
  questionContainer: {
    alignItems: 'center',
    paddingHorizontal: SPACING.LG,
    paddingTop: SPACING.XL,
  },
  questionText: {
    fontSize: 48,
    fontFamily: FONTS.DRUK_WIDE_BOLD,
    color: COLORS.WHITE,
    textAlign: 'center',
    marginBottom: SPACING.MD,
  },
  questionDescription: {
    fontSize: 18,
    fontFamily: FONTS.MONUMENT_EXTENDED,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingVertical: ITEM_HEIGHT,
  },
  numberContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontFamily: FONTS.DRUK_WIDE_BOLD,
    color: COLORS.WHITE,
    includeFontPadding: false,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.XL,
    paddingBottom: SPACING.LG,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: SPACING.XS,
  },
  progressDotActive: {
    backgroundColor: COLORS.WHITE,
    transform: [{ scale: 1.2 }],
  },
  progressDotCompleted: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  setScoreButton: {
    backgroundColor: COLORS.WHITE,
    paddingVertical: SPACING.LG,
    borderRadius: LAYOUT.BORDER_RADIUS.LG,
    width: width - (SPACING.LG * 2),
    marginHorizontal: SPACING.LG,
    marginBottom: 34,
    ...SHADOWS.MEDIUM,
  },
  setScoreButtonDisabled: {
    opacity: 0.5,
  },
  setScoreButtonText: {
    color: COLORS.BLACK,
    fontSize: 20,
    fontFamily: FONTS.DRUK_WIDE_BOLD,
    letterSpacing: 2,
    textAlign: 'center',
  },
}); 