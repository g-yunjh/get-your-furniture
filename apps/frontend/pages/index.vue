<script setup lang="ts">
	const config = useRuntimeConfig();
	const apiBase = config.public.apiBase;
	
	type Listing = {
		id: number;
		title: string;
		description: string;
		priceCents: number;
		condition: 'NEW' | 'GOOD' | 'FAIR' | 'POOR';
		location: string;
		imageUrl: string;
		createdAt: string;
		updatedAt: string;
	};
	
	const { data, error, refresh, pending } = await useFetch<Listing[]>(`${apiBase}/api/listings`);
</script>

<template>
	<div style="max-width: 960px; margin: 24px auto; padding: 16px;">
		<h1>Get Your Furniture</h1>
		<p v-if="pending">Loading...</p>
		<p v-else-if="error">Failed to load listings</p>
		<div v-else>
			<button @click="refresh">Refresh</button>
			<div v-if="data?.length === 0">No listings yet.</div>
			<div v-else class="grid">
				<div v-for="item in data" :key="item.id" class="card">
					<img v-if="item.imageUrl" :src="item.imageUrl" alt="image" />
					<h3>{{ item.title }}</h3>
					<p>{{ item.description }}</p>
					<p><strong>{{ (item.priceCents / 100).toLocaleString() }} ₩</strong></p>
					<p>{{ item.condition }} • {{ item.location }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 16px;
	}
	.card {
		border: 1px solid #e6e6e6;
		border-radius: 8px;
		padding: 12px;
		background: #fff;
	}
	.card img {
		width: 100%;
		height: 160px;
		object-fit: cover;
		border-radius: 6px;
		margin-bottom: 8px;
	}
</style>
