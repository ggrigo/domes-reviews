/**
 * Resort Configuration Manager
 * Handles dynamic loading and management of resort-specific data
 */

class ResortConfigManager {
    constructor() {
        this.config = null;
        this.currentResort = null;
    }

    /**
     * Load configuration from JSON file
     */
    async loadConfig() {
        try {
            const response = await fetch('./resorts-config.json');
            const data = await response.json();
            this.config = data;
            return data;
        } catch (error) {
            console.error('Error loading resort configuration:', error);
            // Fallback to Milos configuration if loading fails
            return this.getFallbackConfig();
        }
    }

    /**
     * Get configuration for a specific resort
     */
    getResortConfig(resortId) {
        if (!this.config || !this.config.resorts[resortId]) {
            console.warn(`Resort ${resortId} not found, using default`);
            resortId = this.config?.defaultResort || 'domes-white-coast-milos';
        }
        this.currentResort = this.config.resorts[resortId];
        return this.currentResort;
    }

    /**
     * Get current resort configuration
     */
    getCurrentResort() {
        return this.currentResort;
    }

    /**
     * Get list of all available resorts
     */
    getAllResorts() {
        if (!this.config) return [];
        return Object.values(this.config.resorts).map(resort => ({
            id: resort.id,
            name: resort.name,
            location: resort.location
        }));
    }

    /**
     * Get platform configuration based on URL parameter
     * @param {string} platform - Platform ID (tripadvisor, google, booking, expedia)
     * @returns {object} Platform configuration with name and URL
     */
    getPlatformConfig(platform = null) {
        if (!this.currentResort) return null;
        
        // Use platform from parameter or default
        const platformId = platform || this.currentResort.defaultPlatform || 'tripadvisor';
        
        return this.currentResort.platforms[platformId] || this.currentResort.platforms.tripadvisor;
    }

    /**
     * Get resort from URL parameter
     */
    getResortFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('resort') || this.config?.defaultResort || 'domes-white-coast-milos';
    }

    /**
     * Get platform from URL parameter
     */
    getPlatformFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('platform') || 'default';
    }

    /**
     * Update URL with resort parameter
     */
    updateURLWithResort(resortId) {
        const url = new URL(window.location);
        url.searchParams.set('resort', resortId);
        window.history.pushState({}, '', url);
    }

    /**
     * Generate review prompt for AI
     */
    generateAIPrompt(features, staff, customComments) {
        const resort = this.getCurrentResort();
        if (!resort) return '';

        const featureTexts = features.map(f => resort.features[f]?.reviewText).filter(Boolean);
        let prompt = `Write a genuine, authentic hotel review for ${resort.name} in ${resort.location}. The guest particularly loved: ${featureTexts.join(', ')}.`;
        
        if (staff && staff.length > 0) {
            const staffNames = staff.map(s => {
                const staffMember = resort.staff.find(member => member.display === s);
                return staffMember ? staffMember.name : s;
            });
            prompt += ` They want to specially recognize ${staffNames.join(', ')} for their exceptional service.`;
        }
        
        if (customComments) {
            prompt += ` They also mentioned: "${customComments}"`;
        }
        
        prompt += ' Keep the review natural, personal, and under 150 words. Make it sound like a genuine guest experience, not marketing copy.';
        
        return prompt;
    }

    /**
     * Generate fallback review template
     */
    generateFallbackReview(features, staff, customComments) {
        const resort = this.getCurrentResort();
        if (!resort) return '';

        let review = `Exceptional stay at ${resort.name}! `;
        
        const featureTexts = features.map(f => resort.features[f]?.fallbackText).filter(Boolean);
        if (featureTexts.length > 0) {
            review += featureTexts.join('. ') + '. ';
        }
        
        if (staff && staff.length > 0) {
            const staffNames = staff.map(s => {
                const staffMember = resort.staff.find(member => member.display === s);
                return staffMember ? staffMember.name : s;
            });
            review += `Special thanks to ${staffNames.join(', ')} for making our stay memorable. `;
        }
        
        if (customComments) {
            review += customComments + ' ';
        }
        
        review += 'Highly recommended!';
        
        return review;
    }

    /**
     * Fallback configuration for Milos
     */
    getFallbackConfig() {
        return {
            resorts: {
                "domes-white-coast-milos": {
                    id: "domes-white-coast-milos",
                    name: "Domes White Coast Milos",
                    location: "Milos, Greece",
                    features: {
                        location: {
                            label: "Perfect Location",
                            icon: "📍",
                            reviewText: "perfect location in Milos",
                            fallbackText: "The location in Milos was absolutely perfect"
                        },
                        cleanliness: {
                            label: "Impeccable Cleanliness",
                            icon: "✨",
                            reviewText: "impeccable cleanliness",
                            fallbackText: "The attention to cleanliness was impeccable"
                        },
                        hospitality: {
                            label: "Exceptional Hospitality",
                            icon: "🤝",
                            reviewText: "exceptional hospitality",
                            fallbackText: "The hospitality exceeded all expectations"
                        },
                        dining: {
                            label: "Exquisite Dining",
                            icon: "🍽️",
                            reviewText: "exquisite dining experiences",
                            fallbackText: "The dining experience was truly memorable"
                        },
                        spa: {
                            label: "Luxurious Spa",
                            icon: "🧘",
                            reviewText: "luxurious spa treatments",
                            fallbackText: "The spa treatments were absolutely divine"
                        },
                        ambiance: {
                            label: "Serene Ambiance",
                            icon: "🌅",
                            reviewText: "serene and romantic ambiance",
                            fallbackText: "The ambiance was perfectly serene and romantic"
                        }
                    },
                    staff: [
                        {name: "Marianna", role: "Guest Relations", display: "Marianna (Guest Relations)"},
                        {name: "Apostolos", role: "Restaurant", display: "Apostolos (Restaurant)"},
                        {name: "Christina", role: "Reception", display: "Christina (Reception)"},
                        {name: "Nikos", role: "Pool Bar", display: "Nikos (Pool Bar)"},
                        {name: "Elena", role: "Soma Spa", display: "Elena (Soma Spa)"},
                        {name: "George", role: "Concierge", display: "George (Concierge)"}
                    ],
                    platforms: {
                        default: {
                            additionalPlatforms: [
                                {id: "tripadvisor", name: "TripAdvisor", url: "https://www.tripadvisor.com/Hotel_Review-g12880133-d20284485-Reviews-Domes_White_Coast_Milos-Mytakas_Milos_Cyclades_South_Aegean.html", checked: true},
                                {id: "google", name: "Google Maps", url: "https://search.google.com/local/writereview?placeid=ChIJjUneyFTemBQR8l8IIFjXpKE", checked: true}
                            ]
                        }
                    }
                }
            },
            defaultResort: "domes-white-coast-milos"
        };
    }
}

// Export for use in HTML
window.ResortConfigManager = ResortConfigManager;