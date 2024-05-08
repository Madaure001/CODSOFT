import React from 'react'

const FileUpload = (props) => {

    const [uploadPercentage, setUploadPercentage] = useState(0);
    const { uploadTo, identifier, handleInput } = props;
    const [file, setFile] = useState("");

    const handleUpload = () => {
        console.log(file);
        const data = new FormData();
        data.append("file", file);
        Axios.post(uploadTo, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
                setUploadPercentage(
                parseInt(
                    Math.round((progressEvent.loaded * 100) / progressEvent.total)
                )
                );
            },
        })
        .then((response) => {
            console.log(response.data);
            handleInput(identifier, response.data.url);
            setPopup({
            open: true,
            severity: "success",
            message: response.data.message,
            });
        })
        .catch((err) => {
            console.log(err.response);
            setPopup({
            open: true,
            severity: "error",
            message: err.response.statusText,
            //   message: err.response.data
            //     ? err.response.data.message
            //     : err.response.statusText,
            });
      });
  };
    return (
        <div>FileUpload</div>
    )
}

export default FileUpload