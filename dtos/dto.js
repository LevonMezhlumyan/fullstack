const dto = (data) => {
    const {password, ...others} = data;
    return others
}
export default dto