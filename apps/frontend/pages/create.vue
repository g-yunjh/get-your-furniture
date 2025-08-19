<script setup lang="ts">
	const config = useRuntimeConfig();
	const apiBase = config.public.apiBase;

	const payload = reactive({
		title: '',
		description: '',
		priceCents: 0,
		condition: 'GOOD',
		location: '',
		imageUrl: ''
	});

	const pending = ref(false);
	const errorMsg = ref('');
	const successId = ref<number | null>(null);

	async function submit() {
		pending.value = true;
		errorMsg.value = '';
		successId.value = null;
		try {
			const res = await $fetch(`${apiBase}/api/listings`, {
				method: 'POST',
				body: payload
			});
			successId.value = (res as any).id ?? null;
		} catch (err: any) {
			errorMsg.value = err?.data?.error ? JSON.stringify(err.data.error) : 'Failed to create';
		} finally {
			pending.value = false;
		}
	}
</script>

<template>
	<div style="max-width: 640px; margin: 24px auto; padding: 16px;">
		<h2>Create Listing</h2>
		<div v-if="errorMsg" style="color: #c00;">{{ errorMsg }}</div>
		<div v-if="successId" style="color: #090;">Created! ID: {{ successId }}</div>
		<form @submit.prevent="submit" style="display: grid; gap: 12px;">
			<input v-model="payload.title" placeholder="Title" required />
			<textarea v-model="payload.description" placeholder="Description"></textarea>
			<input v-model.number="payload.priceCents" type="number" min="0" placeholder="Price (cents)" />
			<select v-model="payload.condition">
				<option>NEW</option>
				<option>GOOD</option>
				<option>FAIR</option>
				<option>POOR</option>
			</select>
			<input v-model="payload.location" placeholder="Location" />
			<input v-model="payload.imageUrl" placeholder="Image URL" />
			<button :disabled="pending" type="submit">{{ pending ? 'Saving...' : 'Create' }}</button>
		</form>
	</div>
</template>
