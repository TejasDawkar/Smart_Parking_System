const uploadPDF = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.json({
        message: "File uploaded successfully",
        fileUrl, // Return the full URL
    });
};

export {uploadPDF};