<script lang="ts">
	import { page } from '$app/stores';
	import { getAccessToken } from '$lib/amadeus';

	const flightId = $page.params.id;

	let flightDetails = null;
	let isLoading = true;
	let error: string | null = null;

	async function loadFlightDetails() {
		isLoading = true;
		error = null;

		try {
			const response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers/${flightId}`, {
				headers: {
					Authorization: `Bearer ${await getAccessToken()}`,
				},
			});

			if (!response.ok) {
				throw new Error(`Error fetching flight details: ${response.statusText}`);
			}

			flightDetails = await response.json();
		} catch (err) {
			error = err instanceof Error ? err.message : "An unexpected error occurred.";
		} finally {
			isLoading = false;
		}
	}

	loadFlightDetails();
</script>

<main class="container mx-auto p-6">
	<h1 class="text-3xl font-bold text-center mb-6">Flight Details</h1>

	{#if isLoading}
		<p class="text-center text-gray-500">Loading flight details...</p>
	{:else if error}
		<p class="text-center text-red-500">{error}</p>
	{:else if flightDetails}
		<div class="border border-gray-200 rounded-lg shadow-lg p-6 bg-gray-100">
			<h2 class="text-xl font-bold mb-4">Flight ID: {flightDetails.id}</h2>
			<p><strong>Price:</strong> ${flightDetails.price.total}</p>
			<div class="mt-4">
				<h3 class="text-lg font-bold mb-2">Itineraries</h3>
				<ul>
					{#each flightDetails.itineraries as itinerary}
						<li class="mb-4">
							<p><strong>Duration:</strong> {itinerary.duration}</p>
							<div class="mt-2">
								<h4 class="text-md font-bold">Segments</h4>
								<ul class="pl-4">
									{#each itinerary.segments as segment}
										<li class="mb-2">
											<p><strong>Carrier:</strong> {segment.carrierCode}</p>
											<p><strong>Departure:</strong> {segment.departure.at} ({segment.departure.iataCode})</p>
											<p><strong>Arrival:</strong> {segment.arrival.at} ({segment.arrival.iataCode})</p>
										</li>
									{/each}
								</ul>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{:else}
		<p class="text-center text-gray-500">No flight details available.</p>
	{/if}

	<div class="text-center mt-6">
		<a
			href="/results"
			class="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
		>
			Back to Results
		</a>
	</div>
</main>

<style>
    main {
        font-family: 'Inter', sans-serif;
    }
</style>