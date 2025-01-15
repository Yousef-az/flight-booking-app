import axios from 'axios';

// Define the types for Search Criteria and Flight Offers
interface SearchCriteria {
	departureCity: string;
	destinationCity: string;
	date: string;
}

interface FlightOffer {
	id: string;
	price: { total: string };
	itineraries: Array<{
		duration: string;
		segments: Array<{
			carrierCode: string;
			departure: { at: string };
			arrival: { at: string };
		}>;
	}>;
}

let accessToken: string | null = null;

// Fetch Bearer Token from Amadeus API
export async function getAccessToken(): Promise<string> {
	const apiKey = import.meta.env.VITE_AMADEUS_API_KEY ?? '';
	const apiSecret = import.meta.env.VITE_AMADEUS_API_SECRET ?? '';

	// Log credentials for debugging purposes (remove in production)
	console.log('API Key:', apiKey ? 'Provided' : 'Missing');
	console.log('API Secret:', apiSecret ? 'Provided' : 'Missing');

	if (!apiKey || !apiSecret) {
		throw new Error('Missing Amadeus API credentials. Please check your .env file.');
	}

	// Use cached token if available
	if (!accessToken) {
		try {
			console.log('Fetching new access token...');
			const response = await axios.post(
				'https://test.api.amadeus.com/v1/security/oauth2/token',
				new URLSearchParams({
					grant_type: 'client_credentials',
					client_id: apiKey,
					client_secret: apiSecret,
				}).toString(),
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				}
			);

			console.log('Token Response:', response.data);
			accessToken = response.data.access_token;
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				console.error('Error fetching Bearer Token:', error.response?.data || error.message);
				throw new Error(
					error.response?.data?.error_description || 'Failed to fetch Bearer Token. Check your API credentials.'
				);
			} else {
				console.error('Unexpected error:', error);
				throw new Error('An unexpected error occurred while fetching the Bearer Token.');
			}
		}
	}

	if (!accessToken) {
		throw new Error('Failed to obtain access token. Amadeus API did not return a token.');
	}

	return accessToken;
}

// Fetch Flight Offers from Amadeus API
export async function fetchFlightOffers(searchCriteria: SearchCriteria): Promise<FlightOffer[]> {
	const token = await getAccessToken();

	console.log('Fetching flight offers with criteria:', searchCriteria);

	try {
		const response = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: {
				originLocationCode: searchCriteria.departureCity,
				destinationLocationCode: searchCriteria.destinationCity,
				departureDate: searchCriteria.date,
				adults: 1, // Adjust based on your form inputs
			},
		});

		console.log('Flight Offers Response:', response.data);
		return response.data.data; // Return flight offers
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			console.error('Error fetching flight offers:', error.response?.data || error.message);
			throw new Error(
				error.response?.data?.errors?.[0]?.detail || 'Failed to fetch flight offers. Check your search criteria and API usage.'
			);
		} else {
			console.error('Unexpected error:', error);
			throw new Error('An unexpected error occurred while fetching flight offers.');
		}
	}
}
