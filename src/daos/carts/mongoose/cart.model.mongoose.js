import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const cartSchema = new Schema(
    {
        _id: { type: String, default: uuidv4 },
        _productos: {
            type: [
                {
                    _id: { type: String, ref: "productos" },
                    quantity: { type: Number, min: 1, default: 1 },
                },
            ],
            default: [],
        },
    },
    {
        strict: "throw",
        versionKey: false,
    }
);

export default cartSchema;
