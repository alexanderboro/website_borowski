// Handle request and send response
export const queryAndSendJsonResponse = async (req, res, operation) => {
    try {
        const result = await operation();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};
