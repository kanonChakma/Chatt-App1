export const imageUplaod = (pics, setPic, setSelectedFile, toast) => {
    if (pics === undefined) {
      setSelectedFile(false);
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    console.log(pics);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      setSelectedFile(true);
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", process.env.REACT_APP_PRESET_NAME);
      data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);

      fetch(process.env.REACT_APP_CLOUD, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setPic({img_url : data.url.toString(), public_id: data.public_id});
          setSelectedFile(false);
        })
        .catch((err) => {
          console.log(err);
          setSelectedFile(false);
        });
    } else {
      setSelectedFile(false);
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setSelectedFile(false);
      return;
    }
  };