import MediaOutlet from './mediaOutlet';
import MediaRequest from './mediaRequest';

export class MediaContact {
    id: Number = 0;
    firstName: String;
    lastName: String;
    email: String;
    phone: String;
    mediaOutlets: MediaOutlet[] = [];
    mediaRequests: MediaRequest[] = [];
    location: string;
    lastActive: Date;

    constructor(firstName: string, lastName: string, email: string, phone: string, location: string, lastActive: Date) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.phone = phone;
        this.location = location;
        this.lastActive = lastActive
    }
}

export default MediaContact;