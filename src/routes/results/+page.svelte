<script lang="ts">
	import { fetchFlightOffers } from '$lib/amadeus';

	interface FlightOffer {
		id: string;
		price: { total: string };
		itineraries: Array<{
			duration: string;
			segments: Array<{
				carrierCode: string;
				departure: { iataCode: string; at: string };
				arrival: { iataCode: string; at: string };
			}>;
		}>;
	}

	// Map of carrier codes to airline names
	const airlineNames: Record<string, string> = {
		AA: 'American Airlines',
		DL: 'Delta Air Lines',
		UA: 'United Airlines',
		F9: 'Frontier Airlines',
		SY: 'Sun Country Airlines',
		AS: 'Alaska Airlines',
		// Add more airlines as needed
	};

	let flights: FlightOffer[] = [];
	let isLoading = true;
	let error: string | null = null;

	const searchCriteria = {
		departureCity: 'JFK',
		destinationCity: 'LAX',
		date: '2025-01-20',
	};

	async function loadFlights() {
		isLoading = true;
		error = null;

		try {
			flights = await fetchFlightOffers(searchCriteria);
		} catch (err) {
			error = err instanceof Error ? err.message : 'An unexpected error occurred.';
		} finally {
			isLoading = false;
		}
	}

	function formatDateTime(dateTime: string): string {
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			timeZoneName: 'short',
		};
		return new Date(dateTime).toLocaleString(undefined, options);
	}

	loadFlights();
</script>

<main class="container mx-auto p-6">
	<h1 class="text-4xl font-extrabold text-center mb-8 text-gradient">
		✈️ Explore the Best Flight Options
	</h1>

	{#if isLoading}
		<div class="flex justify-center items-center h-64">
			<div class="loader"></div>
		</div>
	{:else if error}
		<p class="text-center text-red-600 text-xl font-bold">{error}</p>
	{:else if flights.length === 0}
		<p class="text-center text-gray-500 text-lg">No flights found for your search criteria.</p>
	{:else}
		<ul class="space-y-6">
			{#each flights as flight}
				<li
					class="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col md:flex-row justify-between items-center hover:bg-gray-50 hover:shadow-lg transition"
				>
					<!-- Flight Details -->
					<div class="flex flex-col gap-4 w-full md:w-2/3">
						<!-- Airline and Duration -->
						<div class="flex justify-between items-center">
							<h2 class="text-xl font-bold text-gray-700">
								Airline: {airlineNames[flight.itineraries[0].segments[0].carrierCode] || 'Unknown Airline'}
							</h2>
							<p class="text-sm text-gray-500">
								Duration: <span class="text-blue-600 font-bold">{flight.itineraries[0].duration}</span>
							</p>
						</div>

						<!-- Departure and Arrival -->
						<div class="grid grid-cols-2 gap-4 text-sm">
							<div class="flex flex-col">
								<p class="text-gray-500 font-bold">Departure</p>
								<p class="text-lg text-gray-700 font-semibold">
									{formatDateTime(flight.itineraries[0].segments[0].departure.at)}
								</p>
								<p class="text-lg font-bold text-indigo-500">
									{flight.itineraries[0].segments[0].departure.iataCode}
								</p>
							</div>
							<div class="flex flex-col">
								<p class="text-gray-500 font-bold">Arrival</p>
								<p class="text-lg text-gray-700 font-semibold">
									{formatDateTime(flight.itineraries[0].segments[0].arrival.at)}
								</p>
								<p class="text-lg font-bold text-green-500">
									{flight.itineraries[0].segments[0].arrival.iataCode}
								</p>
							</div>
						</div>
					</div>

					<!-- Price and Action -->
					<div class="flex flex-col items-center md:items-end gap-4 mt-4 md:mt-0">
						<p class="text-lg font-bold text-green-600">
							${flight.price.total}
						</p>
						<a
							href={`/details/${flight.id}`}
							class="px-6 py-2 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600 transition"
						>
							View Details
						</a>
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</main>

<style>
    main {
        font-family: 'Inter', sans-serif;
    }

    .text-gradient {
        background: linear-gradient(to right, #4f46e5, #9333ea, #d946ef);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .loader {
        border: 6px solid #f3f3f3; /* Light grey */
        border-top: 6px solid #4f46e5; /* Blue */
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>