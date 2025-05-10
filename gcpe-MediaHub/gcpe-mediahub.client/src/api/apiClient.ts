const BASE_URL = 'http://localhost:5020/api';

export interface MediaRequest {
    requestId: string;
    status: 'New' | 'Pending' | 'Rejected' | 'Reviewed' | 'Scheduled' | 'Unavailable' | 'Approved' | 'Completed';
    requestTitle: string;
    requestType: 'Information' | 'Interview' | 'Scrum/Halls';
    requestedBy: string;
    receivedOn: string;
    deadline: string;
    requestDetails: string;
    requestResolution: 'DeclinedToComment' | 'ProvidedBackgrounder' | 'ProvidedScrumAudio' | 'ProvideStatement' | 
                      'ReferredToMediaAvail' | 'ReferredToThirdParty' | 'ReporterDropped' | 'ScheduledInterview' | 
                      'Unavailable' | 'Other';
    leadMinistry: 'OfficeOfThePremier' | 'AgricultureAndFood' | 'Finance' | 'Health';
    additionalMinistry: 'OfficeOfThePremier' | 'AgricultureAndFood' | 'Finance' | 'Health';
    assignedTo: string;
    notifiedRecipients: string;
}

export const apiClient = {
    async getRequests(): Promise<MediaRequest[]> {
        try {
            const response = await fetch(`${BASE_URL}/requests`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching requests:', error);
            throw error;
        }
    }
};