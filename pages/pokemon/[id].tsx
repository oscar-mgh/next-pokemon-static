import { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Button, Card, Container, Grid, Text, Image } from '@nextui-org/react';
import { Layout } from '../../components/layouts';
import { pokeapi } from '../../api';
import { getPokemonInfo, localFavorites } from '../../utils';
import { PokemonComplete } from '../../interfaces/pokemon-complete';
import confetti from 'canvas-confetti';

interface Props {
	pokemon: PokemonComplete;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
	const [isPokemonInFavorites, setIsPokemonInFavorites] = useState(
		localFavorites.isInFavorites(pokemon.id)
	);

	const buttonText = (): string => {
		return isPokemonInFavorites ? 'In Favorites' : 'Save To Favorites';
	};

	const onToggleFavorite = () => {
		localFavorites.toggleFavorite(pokemon.id);
		setIsPokemonInFavorites(!isPokemonInFavorites);

		if (isPokemonInFavorites) return;

		confetti({
			zIndex: 99,
			particleCount: 50,
			spread: 160,
			angle: -100,
			origin: {
				x: 1,
				y: 0,
			},
		});
	};

	return (
		<Layout title={pokemon.name}>
			<Grid.Container css={{ marginTop: '5px' }} gap={2}>
				<Grid xs={12} sm={4}>
					<Card isHoverable css={{ padding: '30px' }}>
						<Card.Body>
							<Card.Image
								src={
									pokemon.sprites.other?.dream_world.front_default ||
									'/no-image.png'
								}
								alt={pokemon.name}
								width="100%"
								height={200}
							/>
						</Card.Body>
					</Card>
				</Grid>

				<Grid xs={12} sm={8}>
					<Card>
						<Card.Header
							css={{ display: 'flex', justifyContent: 'space-between' }}
						>
							<Text h1 transform="capitalize">
								{pokemon.name}
							</Text>

							<Button
								color="gradient"
								onPress={onToggleFavorite}
								ghost={!isPokemonInFavorites}
							>
								{buttonText()}
							</Button>
						</Card.Header>

						<Card.Body>
							<Text size={30}>Sprites:</Text>
							<Container direction="row" display="flex">
								<Image
									src={pokemon.sprites.front_default}
									alt={pokemon.name}
									width={100}
									height={100}
								/>
								<Image
									src={pokemon.sprites.back_default}
									alt={pokemon.name}
									width={100}
									height={100}
								/>
								<Image
									src={pokemon.sprites.front_shiny}
									alt={pokemon.name}
									width={100}
									height={100}
								/>
								<Image
									src={pokemon.sprites.back_shiny}
									alt={pokemon.name}
									width={100}
									height={100}
								/>
							</Container>
						</Card.Body>
					</Card>
				</Grid>
			</Grid.Container>
		</Layout>
	);
};

export default PokemonPage;

export const getStaticPaths: GetStaticPaths = async _ctx => {
	const oneHundredPokemons = [...Array(100)].map((value, i) => `${i + 1}`);

	return {
		paths: oneHundredPokemons.map(id => ({
			params: { id },
		})),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { id } = params as { id: string };
	const pokemon = await getPokemonInfo(id);
	return {
		props: {
			pokemon,
		},
	};
};
