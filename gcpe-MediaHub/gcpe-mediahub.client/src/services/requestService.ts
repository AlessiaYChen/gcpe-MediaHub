import { MediaRequest, RequestStatus, RequestType, RequestResolution, Ministry } from '../api/apiClient';
import { apiClient } from '../api/apiClient';

async function loadMockData(): Promise<any[]> {
    const response = await fetch('/data/mock-requests.json');
    return response.json();
}

// Type guard to validate the shape of mock data
function isValidMediaRequest(request: any): request is MediaRequest {
    return (
        typeof request === 'object' &&
        typeof request.requestId === 'string' &&
        typeof request.status === 'string' &&
        ['New', 'Pending', 'Rejected', 'Reviewed', 'Scheduled', 'Unavailable', 'Approved', 'Completed'].includes(request.status) &&
        typeof request.requestType === 'string' &&
        ['Information', 'Interview', 'Scrum/Halls'].includes(request.requestType) &&
        ['ENV', 'FIN', 'FOR', 'HLTH', 'HOUS'].includes(request.leadMinistry) &&
        (!request.additionalMinistry || ['ENV', 'FIN', 'FOR', 'HLTH', 'HOUS'].includes(request.additionalMinistry))
    );
}

// Validate and convert mock data to proper types
function validateMockData(data: any[]): MediaRequest[] {
    return data.filter(isValidMediaRequest).map(item => ({
        ...item,
        status: item.status as RequestStatus,
        requestType: item.requestType as RequestType,
        requestResolution: item.requestResolution as RequestResolution,
        leadMinistry: item.leadMinistry as Ministry,
        additionalMinistry: item.additionalMinistry as Ministry | undefined,
        isPressGallery: item.isPressGallery, // New field added
        outlet: item.outlet || "Unknown Outlet", // Ensure outlet field is handled
        deadline: item.deadline && !isNaN(Date.parse(item.deadline)) ? item.deadline : "Invalid Date" as string // Handle invalid dates
    }));
}

export const requestService = {
    async getRequests(): Promise<MediaRequest[]> {
        const useMockData = import.meta.env.VITE_MRM_API === '0';

        if (useMockData) {
            // Load and validate mock data
            const mockData = await loadMockData();
            return validateMockData(mockData);
        }

        try {
            // Return data from API
            return await apiClient.getRequests();
        } catch (error) {
            console.error('Error fetching requests from API:', error);
            // Fallback to mock data if API fails
            console.log('Falling back to mock data');
            const mockData = await loadMockData();
            return validateMockData(mockData);
        }
    }
};