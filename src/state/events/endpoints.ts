import endpoint from "utils/endpoint";

export const fetchCategoriesEndpoint = endpoint('get', 'categories/all');
export const addEventEndpoint = endpoint('post', 'event');
export const updateEventEndpoint = (id:string) => endpoint('put', `event/${id}`);
export const deleteEventEndpoint = (id:string) => endpoint('delete', `event/${id}`);
export const fetchNotModeratedEventsEndpoint = endpoint('get', 'event/not-moderated');
export const fetchEventsEndpoint = endpoint('get', 'event/');
export const confirmEventEndpoint = (id:string) => endpoint('get', `event/accept/${id}`);
export const fetchEventByIdEndpoint = (id:string) => endpoint('get', `event/${id}`);
export const approveJoiningEventEndpoint = ({ email, eventId }:any) =>
	endpoint('get', `event/approve/${email}/${eventId}`);
export const findEventByLocationEndpoint = endpoint(
	'get',
	'event/by-coordinate',
);

export const joinToEventEndpoint = endpoint('get', 'event/join');
export const fetchEventHistoryEndpoint = endpoint('get', 'event/history');
export const fetchUpcomingEventHistoryEndpoint = endpoint(
	'get',
	'event/history/upcoming',
);
export const fetchPromotionEventsEndpoint = endpoint('get', 'event/preferred');
export const fetchWeekTopEventsEndpoint = endpoint('get', 'event/week-top');
export const generateRandomEventEndpoint = endpoint('post', 'event/random');
export const setRatingEventEndpoint = endpoint('post', 'rating');
export const sendMeetingRequestEndpoint = (id:string) =>
	endpoint('post', `/event/meeting/${id}`);
