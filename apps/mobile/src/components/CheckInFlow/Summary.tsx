import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
  Dimensions,
} from 'react-native';
import { QUESTIONS, SCORE_BANDS, REWARDS } from './constants';
import { COLORS, FONTS, SPACING, LAYOUT, SHADOWS, TEXT_SHADOWS } from '../../styles/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface SummaryProps {
  answers: number[];
  onClose: () => void;
  onEdit: () => void;
  animationValue: Animated.Value;
}

const getScoreMessage = (score: number) => {
  if (score > SCORE_BANDS.EXCELLENT.threshold) return { 
    ...SCORE_BANDS.EXCELLENT.getRandomMessage(),
    confettiCount: SCORE_BANDS.EXCELLENT.confettiCount 
  };
  if (score > SCORE_BANDS.GREAT.threshold) return { 
    ...SCORE_BANDS.GREAT.getRandomMessage(),
    confettiCount: SCORE_BANDS.GREAT.confettiCount 
  };
  if (score > SCORE_BANDS.GOOD.threshold) return { 
    ...SCORE_BANDS.GOOD.getRandomMessage(),
    confettiCount: SCORE_BANDS.GOOD.confettiCount 
  };
  return { 
    ...SCORE_BANDS.SUPPORT.getRandomMessage(),
    confettiCount: SCORE_BANDS.SUPPORT.confettiCount 
  };
};

const calculateFinalScore = (answers: number[]) => {
  const baseScore = answers.slice(0, 3).reduce((sum, val) => sum + val, 0);
  const stressScore = answers[3] || 0;
  return baseScore - stressScore;
};

const getBonusPoints = (score: number) => {
  if (score > SCORE_BANDS.EXCELLENT.threshold) return REWARDS.BONUS.EXCELLENT;
  if (score > SCORE_BANDS.GREAT.threshold) return REWARDS.BONUS.GREAT;
  return REWARDS.BONUS.BASIC;
};

const getParticleConfig = (score: number) => {
  if (score > SCORE_BANDS.EXCELLENT.threshold) return {
    particles: PARTICLES.EXCELLENT,
    count: 300,
    origin: { x: LAYOUT.SCREEN_WIDTH / 2, y: LAYOUT.SCREEN_HEIGHT },
    fallSpeed: 2000,
    explosionSpeed: 350,
    fadeOut: true,
  };
  if (score > SCORE_BANDS.GREAT.threshold) return {
    particles: PARTICLES.GREAT,
    count: 200,
    origin: { x: LAYOUT.SCREEN_WIDTH / 2, y: LAYOUT.SCREEN_HEIGHT },
    fallSpeed: 2500,
    explosionSpeed: 300,
    fadeOut: true,
  };
  if (score > SCORE_BANDS.GOOD.threshold) return {
    particles: PARTICLES.GOOD,
    count: 150,
    origin: { x: LAYOUT.SCREEN_WIDTH / 2, y: LAYOUT.SCREEN_HEIGHT },
    fallSpeed: 3000,
    explosionSpeed: 250,
    fadeOut: true,
  };
  return {
    particles: PARTICLES.SUPPORT,
    count: 50,
    origin: { x: LAYOUT.SCREEN_WIDTH / 2, y: -50 },
    fallSpeed: 4000,
    explosionSpeed: 200,
    fadeOut: true,
  };
};

export const Summary: React.FC<SummaryProps> = ({ 
  answers, 
  onClose, 
  onEdit,
  animationValue 
}) => {
  const [showTopShadow, setShowTopShadow] = React.useState(false);
  const [showBottomShadow, setShowBottomShadow] = React.useState(true);
  const topShadowAnim = React.useRef(new Animated.Value(0)).current;
  const bottomShadowAnim = React.useRef(new Animated.Value(1)).current;
  
  const finalScore = React.useMemo(() => calculateFinalScore(answers), [answers]);
  const scoreColor = React.useMemo(() => 
    finalScore > SCORE_BANDS.GREAT.threshold ? COLORS.PRIMARY 
    : finalScore > SCORE_BANDS.GOOD.threshold ? COLORS.WARNING 
    : COLORS.DANGER,
    [finalScore]
  );
  
  const { message, emoji } = React.useMemo(() => 
    getScoreMessage(finalScore), 
    [finalScore]
  );
  
  const whoCaresBonusPoints = React.useMemo(() => 
    getBonusPoints(finalScore), 
    [finalScore]
  );
  
  const totalReward = React.useMemo(() => 
    REWARDS.BASE + whoCaresBonusPoints, 
    [whoCaresBonusPoints]
  );

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    
    const shouldShowTop = contentOffset.y > 0;
    if (shouldShowTop !== showTopShadow) {
      setShowTopShadow(shouldShowTop);
      Animated.timing(topShadowAnim, {
        toValue: shouldShowTop ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
    
    const scrolledToBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 1;
    const shouldShowBottom = !scrolledToBottom;
    if (shouldShowBottom !== showBottomShadow) {
      setShowBottomShadow(shouldShowBottom);
      Animated.timing(bottomShadowAnim, {
        toValue: shouldShowBottom ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.outerContainer}>
      <Animated.View style={[styles.container, { backgroundColor: scoreColor }]}>
        <Animated.View 
          style={[
            styles.backgroundTint,
            {
              opacity: animationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.15],
              }),
            }
          ]} 
        />
        
        <Animated.View style={[styles.navigationButtons, {
          opacity: animationValue,
          transform: [{
            translateY: animationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          }],
        }]}>
          <TouchableOpacity 
            style={styles.navBackButton} 
            onPress={onEdit}
            activeOpacity={0.7}
          >
            <Text style={styles.navBackButtonText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navCloseButton} 
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text style={styles.navCloseButtonText}>×</Text>
          </TouchableOpacity>
        </Animated.View>
        
        <Animated.View 
          style={[
            styles.content,
            {
              opacity: animationValue,
              transform: [{
                translateY: animationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              }],
            },
          ]}
        >
          <View style={styles.scoreHeader}>
            <Text style={styles.bigScoreText}>{finalScore}</Text>
            <View style={styles.messageContainer}>
              <Text style={styles.scoreEmoji}>{emoji}</Text>
              <Text style={[styles.scoreMessage, styles.sentenceCase]}>{message}</Text>
            </View>
          </View>
          
          <View style={styles.receiptScrollContainer}>
            <Animated.View 
              style={[
                styles.receiptInnerShadow,
                { opacity: topShadowAnim }
              ]} 
            />
            <Animated.View 
              style={[
                styles.receiptBottomShadow,
                { opacity: bottomShadowAnim }
              ]} 
            />
            <ScrollView 
              style={styles.receiptScroll}
              showsVerticalScrollIndicator={false}
              bounces={true}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              <View style={styles.receiptContainer}>
                <View style={styles.receiptHeader}>
                  <Text style={styles.receiptTitle}>THANK YOU!</Text>
                  <Text style={styles.receiptDate}>
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Text>
                  <Text style={styles.receiptTime}>
                    {new Date().toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Text>
                  <View style={styles.zigzagLine} />
                </View>

                <View style={styles.breakdownSection}>
                  <Text style={styles.sectionTitle}>SCORE BREAKDOWN</Text>
                  {QUESTIONS.map((question, index) => (
                    <View key={question.id} style={styles.itemRow}>
                      <Text style={styles.emoji}>{question.emoji}</Text>
                      <Text style={styles.itemLabel}>{question.text}</Text>
                      <Text style={styles.itemValue}>
                        {index === 3 ? '-' : '+'}{answers[index]}
                      </Text>
                    </View>
                  ))}
                </View>

                <View style={styles.dottedLine} />

                <View style={styles.rewardsSection}>
                  <Text style={styles.sectionTitle}>$WHOCARES REWARDS</Text>
                  <View style={styles.itemRow}>
                    <Text style={styles.itemLabel}>Base Reward</Text>
                    <Text style={styles.itemValue}>{REWARDS.BASE.toLocaleString()}</Text>
                  </View>
                  <View style={styles.itemRow}>
                    <Text style={styles.itemLabel}>Score Bonus</Text>
                    <Text style={styles.itemValue}>+{whoCaresBonusPoints.toLocaleString()}</Text>
                  </View>
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>TOTAL</Text>
                    <Text style={styles.totalValue}>{totalReward.toLocaleString()}</Text>
                  </View>
                </View>

                <View style={styles.zigzagLine} />

                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={onClose}
                  activeOpacity={0.7}
                >
                  <Text style={styles.closeButtonText}>CLOSE</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.BLACK,
  },
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.BLACK,
  },
  content: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
  },
  scoreHeader: {
    alignItems: 'center',
    marginBottom: SPACING.LG,
    width: '100%',
    paddingTop: SPACING.XL,
  },
  bigScoreText: {
    fontSize: 120,
    fontFamily: FONTS.DRUK_WIDE_BOLD,
    color: COLORS.WHITE,
    textAlign: 'center',
    marginBottom: SPACING.MD,
    ...TEXT_SHADOWS.MEDIUM,
    includeFontPadding: false,
    lineHeight: 130,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.LG,
    paddingHorizontal: SPACING.XL,
    width: '100%',
  },
  scoreEmoji: {
    fontSize: 32,
    marginRight: SPACING.MD,
  },
  scoreMessage: {
    fontSize: 24,
    fontFamily: FONTS.DRUK_WIDE_BOLD,
    color: COLORS.WHITE,
    textAlign: 'center',
    flexShrink: 1,
    ...TEXT_SHADOWS.SMALL,
  },
  sentenceCase: {
    textTransform: 'none',
  },
  receiptScrollContainer: {
    flex: 1,
    marginHorizontal: SPACING.LG,
    marginBottom: SPACING.LG,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: COLORS.WHITE,
    borderRadius: LAYOUT.BORDER_RADIUS.MD,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  receiptInnerShadow: {
    position: 'absolute',
    top: -32,
    left: 0,
    right: 0,
    height: 32,
    zIndex: 2,
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  receiptBottomShadow: {
    position: 'absolute',
    bottom: -32,
    left: 0,
    right: 0,
    height: 32,
    zIndex: 2,
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  receiptScroll: {
    flex: 1,
  },
  receiptHeader: {
    alignItems: 'center',
    marginBottom: SPACING.LG,
    paddingTop: SPACING.MD,
  },
  receiptTitle: {
    fontSize: 32,
    fontFamily: FONTS.DRUK_WIDE_BOLD,
    color: COLORS.BLACK,
    marginBottom: SPACING.SM,
  },
  receiptDate: {
    fontSize: 14,
    fontFamily: FONTS.MONUMENT_EXTENDED,
    color: COLORS.GRAY,
  },
  receiptTime: {
    fontSize: 14,
    fontFamily: FONTS.MONUMENT_EXTENDED,
    color: COLORS.GRAY,
    marginBottom: SPACING.MD,
  },
  zigzagLine: {
    height: 8,
    width: '100%',
    backgroundColor: COLORS.BLACK,
    marginVertical: SPACING.MD,
    borderRadius: 1,
  },
  dottedLine: {
    height: 1,
    width: '100%',
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    marginVertical: SPACING.LG,
  },
  breakdownSection: {
    marginBottom: SPACING.LG,
  },
  rewardsSection: {
    marginBottom: SPACING.LG,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: FONTS.MONUMENT_EXTENDED,
    color: COLORS.GRAY,
    marginBottom: SPACING.MD,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.LG,
    width: '100%',
  },
  emoji: {
    fontSize: 24,
    width: SPACING.XXL,
    marginRight: SPACING.SM,
  },
  itemLabel: {
    flex: 1,
    fontSize: 20,
    fontFamily: FONTS.MONUMENT_EXTENDED,
    color: COLORS.BLACK,
  },
  itemValue: {
    fontSize: 24,
    fontFamily: FONTS.DRUK_WIDE_BOLD,
    color: COLORS.BLACK,
    textAlign: 'right',
    minWidth: 80,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.LG,
    paddingTop: SPACING.LG,
    borderTopWidth: 2,
    borderTopColor: COLORS.BLACK,
  },
  totalLabel: {
    flex: 1,
    fontSize: 20,
    fontFamily: FONTS.DRUK_WIDE_BOLD,
    color: COLORS.BLACK,
  },
  totalValue: {
    fontSize: 28,
    fontFamily: FONTS.DRUK_WIDE_BOLD,
    color: COLORS.BLACK,
    textAlign: 'right',
    minWidth: 120,
  },
  closeButton: {
    backgroundColor: COLORS.BLACK,
    paddingVertical: SPACING.LG,
    paddingHorizontal: SPACING.XL,
    borderRadius: LAYOUT.BORDER_RADIUS.MD,
    marginTop: SPACING.MD,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: COLORS.WHITE,
    fontSize: 20,
    fontFamily: FONTS.DRUK_WIDE_BOLD,
    letterSpacing: 2,
  },
  receiptContainer: {
    backgroundColor: COLORS.WHITE,
    padding: SPACING.XL,
    paddingBottom: SPACING.XL + 16,
  },
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
  },
  navCloseButtonText: {
    color: COLORS.WHITE,
    fontSize: 32,
    fontFamily: FONTS.MONUMENT_EXTENDED,
    lineHeight: 32,
    ...TEXT_SHADOWS.SMALL,
  },
}); 