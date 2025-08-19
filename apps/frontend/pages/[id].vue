<script setup lang="ts">
	const route = useRoute();
	const config = useRuntimeConfig();
	const apiBase = config.public.apiBase;
	const id = Number(route.params.id);

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
	}

	const { data, error, refresh, pending } = await useFetch<Listing>(`${apiBase}/api/listings/${id}`);
	const editing = ref(false);
	const form = reactive({
		title: '',
		description: '',
		priceCents: 0,
		condition: 'GOOD',
		location: '',
		imageUrl: ''
	});

	watchEffect(() => {
		if (data.value && !editing.value) {
			Object.assign(form, {
				title: data.value.title,
				description: data.value.description,
				priceCents: data.value.priceCents,
				condition: data.value.condition,
				location: data.value.location,
				imageUrl: data.value.imageUrl
			});
		}
	});

	async function save() {
		await $fetch(`${apiBase}/api/listings/${id}` , { method: 'PUT', body: form });
		editing.value = false;
		await refresh();
	}

	async function removeItem() {
		await $fetch(`${apiBase}/api/listings/${id}` , { method: 'DELETE' });
		await navigateTo('/');
	}
</script>

<template>
	<div style="max-width: 640px; margin: 24px auto; padding: 16px;">
		<div v-if="pending">Loading...</div>
		<div v-else-if="error">Not found</div>
		<div v-else-if="data">
			<div v-if="!editing">
				<h2>{{ data.title }}</h2>
				<img v-if="data.imageUrl" :src="data.imageUrl" alt="image" style="width: 100%; max-height: 320px; object-fit: cover; border-radius: 8px;" />
				<p>{{ data.description }}</p>
				<p><strong>{{ (data.priceCents / 100).toLocaleString() }} ₩</strong></p>
				<p>{{ data.condition }} • {{ data.location }}</p>
				<div style="display: flex; gap: 8px;">
					<button @click="editing = true">Edit</button>
					<button @click="removeItem">Delete</button>
				</div>
			</div>
			<div v-else>
				<h3>Edit</h3>
				<form @submit.prevent="save" style="display: grid; gap: 12px;">
					<input v-model="form.title" placeholder="Title" />
					<textarea v-model="form.description" placeholder="Description"></textarea>
					<input v-model.number="form.priceCents" type="number" min="0" placeholder="Price (cents)" />
					<select v-model="form.condition">
						<option>NEW</option>
						<option>GOOD</option>
						<option>FAIR</option>
						<option>POOR</option>
					</select>
					<input v-model="form.location" placeholder="Location" />
					<input v-model="form.imageUrl" placeholder="Image URL" />
					<div style="display: flex; gap: 8px;">
						<button type="submit">Save</button>
						<button type="button" @click="editing = false">Cancel</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
