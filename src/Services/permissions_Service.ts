import permissions_Model from "../Models/permissions_Model";





// == JWT SECRET KEY ==
const JWT_SECRET = process.env.JWT_SECRET as string;

class permissions_Service {
    // == Get All Permissions ==
    public async getAllPermissions() {
        try {
            const res = await permissions_Model.FetchPermissionsFromDB()
            console.warn("Service : ",res)
            return res
            
        } catch (error) {
            throw error;
        }
    }




}

export default new permissions_Service();