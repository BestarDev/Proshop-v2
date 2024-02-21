import { Helmet } from 'react-helmet-async'

const Meta = ({title, keyword, description}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name='keyword' content={keyword}/>
        <meta name='description' content={description} />
    </Helmet>
  )
}

Meta.defaultProps = {
    title: "Welcome To Proshop",
    keyword: "electronics, buy electronics, cheap electronics",
    description: "We sell the best products for cheap"
};

export default Meta