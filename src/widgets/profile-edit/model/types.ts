export interface ProfileFormData {
    personalInfo: {
        photo: File | null;
        nickname: string;
        specialty: string;
        email: string;
        level: string;
        phone: string;
        location: string;
    };
    links: {
        id: string;
        type: string;
        url: string;
    }[];
    about: string;
    skills: string[];
    projects: [];
    experience: [];
    education: [];
}