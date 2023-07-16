require("./module")

function DeepApi() {
    let list = ["161df010-d70b-4470-b415-4586db1989ce", "fffc8ff1-598b-4f7c-99f8-7ad07a3a31d0", "68c24e7b-3c5b-4bd0-9b03-1729ff17e8b3"]
    return list[Math.floor(Math.random() * list.length)]
}

async function deepai(type, files = {}) {
    if (!type) return new Error("no type")
    let form = new FormData;
    for (let key of Object.keys(files)) form.append(key, files[key], Buffer.isBuffer(files[key]) ? "kontol.png" : null);
    try {
        let res = await axios.post("https://api.deepai.org/api/" + type, form, {
            headers: {
                "api-key": DeepApi(),
                ...form.getHeaders()
            }
        });
        return res.data
    } catch (e) {
        return new Error(e.response.data.err)
    };
}

global.remini = deepai