export interface EventItem {
    _id: string;
    name: string;
    date: string;
    time: string;
    location: string;
    details: string;
    contact: string;
    phone: string;
    email: string;
    website: string;
    imageURL: string;
    isBookable: boolean;
    createdAt: string;
    totalLikesCount: number;
    totalVisitingCount: number;
    firstTwoLikes: any[];
    firstTwoVisitors: any[];
    isLiked: boolean;
    isGoing: boolean;
    likedUserDetails: any[];
    attendingUserDetails: any[];
}