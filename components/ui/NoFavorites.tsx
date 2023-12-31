import { Container, Image, Text } from '@nextui-org/react';

const NoFavorites = () => {
	return (
		<Container
			css={{
				display: 'flex',
				flexDirection: 'column',
				height: 'calc(100vh - 100px)',
				alignItems: 'center',
				justifyContent: 'center',
				alignSelf: 'center',
			}}
		>
			<Text h1>No favorites yet</Text>
			<Image
				src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
				alt="placeholder"
				height={250}
				width={250}
				css={{
					opacity: 0.1,
				}}
			/>
		</Container>
	);
};

export default NoFavorites;
