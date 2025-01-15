<script lang="ts">
	// Define the destinations for the homepage
	let popularDestinations = [
		{ name: 'Paris', imgUrl: '/images/paris.jpg', icon: '🗼' },
		{ name: 'New York', imgUrl: '/images/newyork.jpg', icon: '🗽' },
		{ name: 'Tokyo', imgUrl: '/images/tokyo.jpg', icon: '🗾' },
		{ name: 'Dubai', imgUrl: '/images/dubai.jpg', icon: '🌆' },
	];

	let searchCriteria = {
		departureCity: '',
		destinationCity: '',
		date: '',
		passengers: {
			adults: 1,
			children: 0,
			infants: 0,
		},
	};

	function handleSearch() {
		console.log('Searching for flights:', searchCriteria);
		// Implement your search logic here (e.g., navigate to results page)
	}

	// Clear search criteria
	function clearSearch() {
		searchCriteria.departureCity = '';
		searchCriteria.destinationCity = '';
		searchCriteria.date = '';
		searchCriteria.passengers.adults = 1;
		searchCriteria.passengers.children = 0;
		searchCriteria.passengers.infants = 0;
	}
</script>

<main class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
	<!-- Sticky Navigation Bar -->
	<header class="sticky top-0 z-10 bg-indigo-700 shadow-md p-4">
		<nav class="flex justify-between items-center max-w-7xl mx-auto">
			<a href="/" class="text-xl font-bold text-white">FlightSphere</a>
			<ul class="flex space-x-8 text-white">
				<li><a href="#search-section" class="hover:text-gray-300 transition">Search Flights</a></li>
				<li><a href="#popular-destinations" class="hover:text-gray-300 transition">Popular Destinations</a></li>
				<li><a href="#" class="hover:text-gray-300 transition">About</a></li>
				<li><a href="#" class="hover:text-gray-300 transition">Contact</a></li>
			</ul>
		</nav>
	</header>

	<!-- Hero Section -->
	<section id="search-section" class="hero h-screen flex items-center justify-center text-center px-6 relative">
		<div class="absolute inset-0 bg-black opacity-30"></div>
		<div class="max-w-2xl z-10">
			<h1 class="text-5xl font-extrabold mb-6 animate__animated animate__fadeIn animate__delay-1s">Find Your Perfect Flight</h1>
			<p class="text-xl mb-6 animate__animated animate__fadeIn animate__delay-2s">Search flights to your dream destinations with ease and affordability.</p>

			<!-- Search Bar -->
			<div class="search-bar bg-white text-black p-6 rounded-lg shadow-lg flex flex-col gap-4 sm:flex-row max-w-4xl mx-auto">

				<!-- Departure City -->
				<div class="flex flex-col sm:flex-row gap-2">
					<label for="departureCity" class="text-sm font-semibold">Departure City</label>
					<input
						type="text"
						id="departureCity"
						placeholder="Enter Departure City"
						bind:value={searchCriteria.departureCity}
						class="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
					/>
				</div>

				<!-- Destination City -->
				<div class="flex flex-col sm:flex-row gap-2">
					<label for="destinationCity" class="text-sm font-semibold">Destination City</label>
					<input
						type="text"
						id="destinationCity"
						placeholder="Enter Destination City"
						bind:value={searchCriteria.destinationCity}
						class="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
					/>
				</div>

				<!-- Date Picker -->
				<div class="flex flex-col sm:flex-row gap-2">
					<label for="date" class="text-sm font-semibold">Select Date</label>
					<input
						type="date"
						id="date"
						bind:value={searchCriteria.date}
						class="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
					/>
				</div>

				<!-- Passenger Selection -->
				<div class="flex flex-col sm:flex-row gap-2">
					<label for="passengers" class="text-sm font-semibold">Passengers</label>
					<div class="flex gap-2">
						<input
							type="number"
							min="1"
							bind:value={searchCriteria.passengers.adults}
							class="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-16"
							placeholder="Adults"
						/>
						<input
							type="number"
							min="0"
							bind:value={searchCriteria.passengers.children}
							class="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-16"
							placeholder="Children"
						/>
						<input
							type="number"
							min="0"
							bind:value={searchCriteria.passengers.infants}
							class="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-16"
							placeholder="Infants"
						/>
					</div>
				</div>

				<!-- Search Button -->
				<div class="flex flex-col sm:flex-row gap-4 sm:justify-between items-center">
					<button
						on:click={handleSearch}
						class="px-6 py-3 bg-indigo-700 text-white font-bold rounded-lg hover:bg-indigo-800 transition transform hover:scale-105"
					>
						Search Flights
					</button>

					<!-- Clear Button -->
					<button
						on:click={clearSearch}
						class="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
					>
						Clear
					</button>
				</div>
			</div>
		</div>
	</section>

	<!-- Popular Destinations Section -->
	<section id="popular-destinations" class="popular-destinations py-16">
		<h2 class="text-3xl font-bold text-center mb-8 text-white">Popular Destinations</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
			{#each popularDestinations as destination}
				<div class="destination-card relative bg-cover bg-center h-72 rounded-lg shadow-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl cursor-pointer"
						 style="background-image: url({destination.imgUrl})"
				>
					<div class="destination-overlay absolute inset-0 bg-black opacity-50"></div>
					<div class="destination-info absolute inset-0 flex flex-col justify-center items-center text-center text-white">
						<span class="text-4xl mb-4">{destination.icon}</span>
						<h3 class="text-2xl font-bold">{destination.name}</h3>
						<p class="mt-2 text-lg font-semibold">Explore Now</p>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Footer -->
	<footer class="bg-indigo-700 text-white py-8 text-center">
		<p>&copy; 2025 FlightSphere | All Rights Reserved</p>
		<div class="space-x-6 mt-4">
			<a href="#" class="hover:text-gray-300 transition">Facebook</a>
			<a href="#" class="hover:text-gray-300 transition">Twitter</a>
			<a href="#" class="hover:text-gray-300 transition">Instagram</a>
		</div>
	</footer>
</main>

<style>
    .hero {
        background-image: url('/images/hero-bg.jpg');
        background-size: cover;
        background-position: center;
    }

    .search-bar {
        display: flex;
        gap: 10px;
        align-items: center;
    }

    .destination-card {
        position: relative;
        background-size: cover;
        background-position: center;
        cursor: pointer;
        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    }

    .destination-card:hover {
        transform: scale(1.05);
        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    }

    .destination-overlay {
        position: absolute;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .destination-info {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    footer {
        background-color: #4c51bf;
    }

    /* Hover effects for buttons */
    .search-bar button:hover {
        transform: scale(1.1);
    }
</style>