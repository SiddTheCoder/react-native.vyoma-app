import React, { useRef, useEffect, useState, useMemo } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Image,
} from "react-native";
import { Text } from "@/src/components/ThemedText";
import { BlurView } from "expo-blur";
import { ChevronRight } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_SPACING = 16;
const CARD_WIDTH = SCREEN_WIDTH - CARD_SPACING * 2;

interface AdItem {
  title: string;
  company: string;
  location?: string;
  offer?: string;
  imageUrl?: string;
}

// Function to generate complex gradient colors based on index
const generateComplexGradient = (index: number) => {
  const gradientConfigs = [
    {
      colors: ["#FF6B9D", "#C44569", "#FEC163"],
      locations: [0, 0.5, 1],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
    {
      colors: ["#4FACFE", "#00F2FE", "#43E97B"],
      locations: [0, 0.6, 1],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0.8 },
    },
    {
      colors: ["#FA8BFF", "#2BD2FF", "#2BFF88"],
      locations: [0, 0.4, 1],
      start: { x: 0.2, y: 0 },
      end: { x: 0.8, y: 1 },
    },
    {
      colors: ["#A8EDEA", "#FED6E3", "#FFE985"],
      locations: [0, 0.5, 1],
      start: { x: 0, y: 0.5 },
      end: { x: 1, y: 0.5 },
    },
    {
      colors: ["#FF9A8B", "#FF6A88", "#FF99AC"],
      locations: [0, 0.5, 1],
      start: { x: 0, y: 0 },
      end: { x: 1.2, y: 1 },
    },
  ];

  return gradientConfigs[index % gradientConfigs.length];
};

// Complex Background Component with multiple gradient layers
const ComplexBackground = React.memo(
  ({
    index,
    width,
    height,
  }: {
    index: number;
    width: number;
    height: number;
  }) => {
    const primaryGradient = useMemo(
      () => generateComplexGradient(index),
      [index]
    );
    const secondaryGradient = useMemo(
      () => generateComplexGradient(index + 1),
      [index]
    );

    return (
      <View style={[styles.backgroundContainer, { width, height }]}>
        {/* Primary gradient layer */}
        <LinearGradient
          colors={primaryGradient.colors}
          locations={primaryGradient.locations}
          start={primaryGradient.start}
          end={primaryGradient.end}
          style={StyleSheet.absoluteFill}
        />

        {/* Secondary overlay gradient for complexity */}
        <LinearGradient
          colors={[...secondaryGradient.colors.slice(0, 2), "transparent"]}
          locations={[0, 0.3, 1]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[StyleSheet.absoluteFill, { opacity: 0.4 }]}
        />

        {/* Accent gradient spots */}
        <View style={styles.accentSpot1}>
          <LinearGradient
            colors={[primaryGradient.colors[0] + "80", "transparent"]}
            style={StyleSheet.absoluteFill}
          />
        </View>

        <View style={styles.accentSpot2}>
          <LinearGradient
            colors={[primaryGradient.colors[2] + "60", "transparent"]}
            style={StyleSheet.absoluteFill}
          />
        </View>
      </View>
    );
  }
);

export default function Ads() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<AdItem>>(null);
  const scrollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const ads: AdItem[] = useMemo(
    () => [
      {
        title: "Senior React Developer",
        company: "TechCorp",
        location: "Remote",
        offer: "HOT",
        imageUrl:
          "https://api.dicebear.com/7.x/initials/png?seed=TC&backgroundColor=4F46E5",
      },
      {
        title: "UI/UX Designer",
        company: "DesignHub",
        location: "New York",
        imageUrl:
          "https://api.dicebear.com/7.x/initials/png?seed=DH&backgroundColor=EC4899",
      },
      {
        title: "Product Manager",
        company: "StartupXYZ",
        location: "SF",
        offer: "NEW",
        imageUrl:
          "https://api.dicebear.com/7.x/initials/png?seed=SX&backgroundColor=10B981",
      },
    ],
    []
  );

  // Memoized gradient configurations for each card
  const cardGradients = useMemo(() => {
    return ads.map((_, index) => generateComplexGradient(index));
  }, [ads.length]);

  // Auto-slide with proper cleanup
  useEffect(() => {
    const startAutoScroll = () => {
      scrollTimerRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % ads.length;

          // Use setTimeout to ensure state is updated before scrolling
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({
              index: nextIndex,
              animated: true,
            });
          }, 0);

          return nextIndex;
        });
      }, 3000);
    };

    startAutoScroll();

    return () => {
      if (scrollTimerRef.current) {
        clearInterval(scrollTimerRef.current);
      }
    };
  }, [ads.length]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / CARD_WIDTH);
    if (index >= 0 && index < ads.length && index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const handleScrollBeginDrag = () => {
    // Pause auto-scroll when user interacts
    if (scrollTimerRef.current) {
      clearInterval(scrollTimerRef.current);
    }
  };

  const handleScrollEndDrag = () => {
    // Resume auto-scroll after user interaction
    scrollTimerRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % ads.length;
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
        }, 0);
        return nextIndex;
      });
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={ads}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        snapToInterval={CARD_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={styles.flatlistContent}
        renderItem={({ item, index }) => (
          <TouchableOpacity activeOpacity={0.9} style={styles.card}>
            {/* Complex Gradient Background */}
            <ComplexBackground
              index={index}
              width={CARD_WIDTH - 20}
              height={80}
            />

            <BlurView intensity={25} tint="light" style={styles.blur}>
              {item.offer && (
                <View style={styles.offerBadge}>
                  <Text style={styles.offerText}>{item.offer}</Text>
                </View>
              )}

              <View style={styles.content}>
                <View style={styles.textContent}>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.company} numberOfLines={1}>
                    {item.company}
                    {item.location && ` • ${item.location}`}
                  </Text>
                </View>
                <ChevronRight size={20} color="#1F2937" />
              </View>

              {/* Company Image Overlay - Bottom Right */}
              {item.imageUrl && (
                <View style={styles.imageOverlay}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.companyImage}
                    resizeMode="cover"
                  />
                </View>
              )}
            </BlurView>
          </TouchableOpacity>
        )}
        onMomentumScrollEnd={handleScroll}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        getItemLayout={(_, index) => ({
          length: CARD_WIDTH,
          offset: CARD_WIDTH * index,
          index,
        })}
      />

      {/* Dots */}
      {ads.length > 1 && (
        <View style={styles.dots}>
          {ads.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, activeIndex === i && styles.activeDot]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginHorizontal: "auto",
    alignItems: "center",
    alignContent: "center",
  },
  flatlistContent: {
    paddingHorizontal: CARD_SPACING,
  },
  card: {
    width: CARD_WIDTH - 30,
    marginRight: CARD_SPACING,
    height: 80,
    borderRadius: 14,
    overflow: "hidden",
  },
  backgroundContainer: {
    position: "absolute",
    borderRadius: 14,
    overflow: "hidden",
  },
  accentSpot1: {
    position: "absolute",
    top: -20,
    right: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
  },
  accentSpot2: {
    position: "absolute",
    bottom: -30,
    left: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
  },
  blur: {
    flex: 1,
    height: 80,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  offerBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#EF4444",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    zIndex: 10,
  },
  offerText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  textContent: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 3,
  },
  company: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "500",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 8,
    right: 8,
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.9)",
    backgroundColor: "#FFFFFF",
    zIndex: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  companyImage: {
    width: "100%",
    height: "100%",
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  activeDot: {
    backgroundColor: "#374151",
    width: 16,
  },
});
