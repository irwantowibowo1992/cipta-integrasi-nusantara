const humps = require('humps');
class SuccessResult {
    static make(res) {
        this.res = res;
        return this;
    }

    static send(data, total) {
        if (Array.isArray(data)) {
            return this.res.status(200).send(
                {
                    data: {
                        results: data,
                        total: total,
                    },
                },
            );
        } else {
            return this.res.status(200).send(
                {
                    data: data,
                },
            );
        }
    }

    static sendWithHumps(data, total) {
        if (Array.isArray(data)) {
            return this.res.status(200).send(
                {
                    data: {
                        results: humps.camelizeKeys(data),
                        total: total,
                    },
                },
            );
        } else {
            return this.res.status(200).send(
                {
                    data: humps.camelizeKeys(data),
                },
            );
        }
    }

    static sendMessage(message) {
        return this.res.status(200).send(
            {
                message: message,
            },
        );
    }

    static sendMessageData(data, message, other) {
        return this.res.status(200).send(
            {
                message: message,
                data: data,
                ...other,
            },
        );
    }

    static sendMessageDataWithHumps(data, message, other) {
        return this.res.status(200).send(
            {
                message: message,
                data: humps.camelizeKeys(data),
                ...other,
            },
        );
    }

    static sendDownload(path, fileName) {
        if (fileName) return this.res.download(path, fileName);
        return this.res.download(path, fileName);
    }
};

module.exports = SuccessResult;
