require 'sinatra'
require './css2less'

get '/' do
  haml :index
end

post('/farandole') do
  if params[:css].empty?
    redirect '/'
  end
  css = params[:css]
  converter = Css2Less::Converter.new(css)
  converter.generate_tree
  converter.render_less
  "#{converter.get_less}"
end
