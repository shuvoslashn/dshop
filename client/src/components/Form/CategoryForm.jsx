const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='' className='form-label'>
                        Enter New Category
                    </label>
                    <input
                        type='text'
                        className='form-control rounded-0 mb-3'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <button type='submit' className='btn btn-dark rounded-0'>
                        Add Category
                    </button>
                </div>
            </form>
        </>
    );
};

export default CategoryForm;
