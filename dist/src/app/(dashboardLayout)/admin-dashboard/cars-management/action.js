"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCar = exports.createCar = void 0;
const nexios_config_1 = __importDefault(require("@/config/nexios.config"));
const cache_1 = require("next/cache");
const createCar = async (_pre, formData) => {
    try {
        console.log(formData, "formData");
        const newFormData = {
            ...Object.fromEntries(formData),
            rating: Number(Object.fromEntries(formData).rating),
            passengerCapacity: Number(Object.fromEntries(formData).passengerCapacity),
        };
        const res = await nexios_config_1.default.post("/cars", newFormData);
        (0, cache_1.revalidateTag)("carsTable");
        console.log(res.data, "res.data");
        return res.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.createCar = createCar;
// Function to update an existing car
const updateCar = async (carId, formData) => {
    try {
        console.log(formData, "formData");
        const updatedFormData = {
            ...Object.fromEntries(formData),
            rating: Number(Object.fromEntries(formData).rating),
            passengerCapacity: Number(Object.fromEntries(formData).passengerCapacity),
        };
        const res = await nexios_config_1.default.put(`/cars/${carId}`, updatedFormData);
        // Revalidate the cars table after updating
        (0, cache_1.revalidateTag)("carsTable");
        console.log(res.data, "updated car data");
        return res.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.updateCar = updateCar;
