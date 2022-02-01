import ContentLoader, { Facebook } from 'react-content-loader';

export const MyLoader = () => <ContentLoader />
export const MyFacebookLoader = () => <Facebook />

export const ImageLoader = (props) => {

    const { chats } = props;

    const height = chats ? 70 : 140;

    const viewBox = chats ? '0 -1 100 90' : '0 0 43 112';

    const widthHeight = chats ? 89 : 43;

    return <ContentLoader
                height={height}
                speed={1}
                backgroundColor={'#A9A9A9'}
                foregroundColor={'#D3D3D3'}
                viewBox={viewBox}
            >    
            <rect x="0" y="0" rx="50" ry="50" width={widthHeight} height={widthHeight} />
        </ContentLoader>
}