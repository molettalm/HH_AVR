import React from 'react'

export default function Metricas() {
	return (
		<form>
			<div class="grid gap-6 mb-6 md:grid-cols-2">
				<div>
					<label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Usuário</label>
					<input type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="FlavioNeto" required />
					<p id="username" class="mt-2 text-sm text-gray-500 dark:text-gray-400">Por favor insira seu usuário!</p>
				</div>
				<div>
					<label for="weight" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Peso Atual</label>
					<input type="number" id="weight" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="60 Kg" required />
					<p id="weight" class="mt-2 text-sm text-gray-500 dark:text-gray-400">Indique seu peso atual em Kg</p>
				</div>
				<div>
					<label for=" hours_of_sleep" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Horas de Sono</label>
					<input type="time" id=" hours_of_sleep" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
					<p id=" hours_of_sleep" class="mt-2 text-sm text-gray-500 dark:text-gray-400">Indique quantas horas dormiu na última noite</p>
				</div>
				<div>
					<label for="blood_pressure" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Pressão Arterial</label>
					<input type="number" id="high_blood_pressure" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="120 mmHg" required />
					<input type="number" id="low_blood_pressure" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="80 mmHg" required />
					<p id="blood_pressure" class="mt-2 text-sm text-gray-500 dark:text-gray-400">Indique sua pressão arterial sistólica e diastólica medidas hoje</p>
				</div>
				<div>
					<label for="blood_sugar" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Glicose</label>
					<input type="number" id="blood_sugar" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="100 mg/dL" required />
					<p id="blood_sugar" class="mt-2 text-sm text-gray-500 dark:text-gray-400">Indique seu nível de glicose medido hoje</p>
				</div>
				<div>
					<label for="calories_burned" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Calorias Ingeridas</label>
					<input type="number" id="calories_burned" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1000 kcal" required />
					<p id="calories_burned" class="mt-2 text-sm text-gray-500 dark:text-gray-400">Indique quantas calorias ingeridas hoje</p>
				</div>
			</div>
			<button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrar Métricas de Hoje</button>
		</form>
	)
}