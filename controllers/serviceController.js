import fs from 'fs';
import slugify from 'slugify';
import serviceModel from '../models/serviceModel.js';

//* Create Service Controller
export const createServiceController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } =
            req.fields;
        const { photo } = req.files;

        // validation
        switch (true) {
            case !name:
                return res.status(500).json({ message: `Name is required!` });
            case !description:
                return res
                    .status(500)
                    .json({ message: `description is required!` });
            case !price:
                return res.status(500).json({ message: `price is required!` });
            case !category:
                return res
                    .status(500)
                    .json({ message: `category is required!` });
            // case !quantity:
            //     return res
            //         .status(500)
            //         .json({ message: `quantity is required!` });
            case !photo && photo.size > 1048576:
                return res
                    .status(500)
                    .json({ message: `photo is required & less then 1 MB` });
        }

        const services = new serviceModel({
            ...req.fields,
            slug: slugify(name),
        });

        if (photo) {
            services.photo.data = fs.readFileSync(photo.path);
            services.photo.contentType = photo.type;
        }
        await services.save();
        res.status(201).json({
            success: true,
            message: 'Service Create Successfully',
            services,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: `Error in creating service`,
            error,
        });
    }
};

//* Get all Services Controller
export const getServiceController = async (req, res) => {
    try {
        const services = await serviceModel
            .find({})
            .populate('category')
            .select('-photo')
            .limit(12)
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            total: services.length,
            message: 'All Services',
            services,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: `Error in getting all services`,
            error,
        });
    }
};

//* Get Single Services Controller
export const getSingleServiceController = async (req, res) => {
    try {
        const service = await serviceModel
            .findOne({ slug: req.params.slug })
            .select('-photo')
            .populate('category');
        res.status(200).json({
            success: true,
            message: 'Single Service Fetched',
            service,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: `Error in getting all services`,
            error,
        });
    }
};

//* Get Service Photo Controller
export const servicePhotoController = async (req, res) => {
    try {
        const service = await serviceModel
            .findById(req.params.pid)
            .select('photo');
        if (service.photo.data) {
            res.set('Content-type', service.photo.contentType);
            return res.send(service.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: `Error in getting photo`,
            error,
        });
    }
};

//* update Service Controller
export const updateServiceController = async (req, res) => {
    try {
        const { name, slug, description, price, category } = req.fields;
        const { photo } = req.files;

        // validation
        switch (true) {
            case !name:
                return res.status(500).json({ message: `Name is required!` });
            case !description:
                return res
                    .status(500)
                    .json({ message: `description is required!` });
            case !price:
                return res.status(500).json({ message: `price is required!` });
            case !category:
                return res
                    .status(500)
                    .json({ message: `category is required!` });
            // case !quantity:
            //     return res
            //         .status(500)
            //         .json({ message: `quantity is required!` });
            case !photo && photo.size > 1048576:
                return res
                    .status(500)
                    .json({ message: `photo is required & less then 1 MB` });
        }

        const services = await serviceModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );

        if (photo) {
            services.photo.data = fs.readFileSync(photo.path);
            services.photo.contentType = photo.type;
        }
        await services.save();
        res.status(201).json({
            success: true,
            message: 'Service Updated Successfully',
            services,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: `Error in updating service`,
            error,
        });
    }
};

//* Delete Service Controller
export const deleteServiceController = async (req, res) => {
    try {
        await serviceModel.findByIdAndDelete(req.params.pid).select('-photo');
        res.status(200).json({
            success: true,
            message: 'Service Deleted Successfully!',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: `Error in delete service`,
            error,
        });
    }
};
