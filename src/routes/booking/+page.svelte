<script>
	import { page } from '$app/stores';

	// Extract query parameters from the URL
	const { searchParams } = $page.url;
	let firstName = searchParams.get('firstName');
	let lastName = searchParams.get('lastName');
	let email = searchParams.get('email');
	let seat = searchParams.get('seat');
	let reference = searchParams.get('reference');
</script>

<main class="container mx-auto p-6">
	<h1 class="text-3xl font-bold text-center mb-6">Booking Confirmation</h1>

	<div class="border border-gray-200 rounded-lg shadow-lg p-6 bg-gray-100">
		<h2 class="text-xl font-bold mb-4">Thank You for Booking, {firstName} {lastName}!</h2>
		<p class="text-gray-700 mb-4">
			Your booking has been confirmed. Below are your booking details:
		</p>

		<!-- Booking Details -->
		<div class="text-gray-700 mb-6">
			<p><strong>Reference Number:</strong> {reference}</p>
			<p><strong>Name:</strong> {firstName} {lastName}</p>
			<p><strong>Email:</strong> {email}</p>
			<p><strong>Seat:</strong> {seat}</p>
		</div>

		<!-- Actions -->
		<div class="text-center">
			<a
				href="/"
				class="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
			>
				Return to Home
			</a>
		</div>
	</div>
</main>

<style>
    main {
        font-family: 'Inter', sans-serif; /* Use the Inter font for clean typography */
    }
</style>