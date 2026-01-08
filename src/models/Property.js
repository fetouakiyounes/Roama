import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price'],
    },
    location: {
        city: { type: String, required: true },
        address: { type: String, required: true },
        lat: { type: Number }, // For map
        lng: { type: Number },
    },
    images: {
        type: [String],
        required: false,
    },
    type: {
        type: String,
        enum: ['sale', 'rent'],
        required: true,
    },
    propertyType: { // Apartment, Villa, etc.
        type: String,
        default: 'Appartement',
    },
    bedrooms: {
        type: Number,
        default: 0,
    },
    bathrooms: {
        type: Number,
        default: 0,
    },
    area: {
        type: Number, // in m²
        required: true,
    },
    features: {
        type: [String], // e.g., ["Parking", "Balcony", "Pool"]
        default: [],
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);
