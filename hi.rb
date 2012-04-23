require 'sinatra'
require 'css2less'

get '/' do
  haml :index
end

post('/convert') do
  if params[:css].empty?
    redirect '/'
  end
  css = params[:css]
  converter = Css2Less::Converter.new(css)
  converter.process_less
  "#{converter.get_less}"
end

not_found do
  'This is nowhere to be found.'
end

error do
  'Sorry there was a nasty error - ' + env['sinatra.error'].name
end
