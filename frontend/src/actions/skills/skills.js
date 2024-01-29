import axiosInstance from "@/plugins/axios";

export const getSortedSkills = async (params) => {
    const result = await axiosInstance.get("/get_users_skills", {params: params});

    return result?.data
}
